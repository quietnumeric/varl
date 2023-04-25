// 行頭コメントの場合これでいいのかほんとに
const wholeCommentRegExp = /^ *[/#<]/;

// 初出記号を区切りにするにはグループ化と最短一致の両立が必要なもの全然できない
// 含む系の後読み正規表現のやり方完全に忘れたのでアナログに
const splitVarValRegExps = {
  typeScript: /(^[^'"`]+:[^'"`]+)=(.+$)/,
  plSql: /(^[^'"`=:^]+):=(.+$)/,
  general: /(^[^=:^><]+)[=:^><]+(.+$)/,
};

const groupMatch = (whole, regExp) => {
  const matches = whole.match(regExp);
  if (!matches) return null;
  const [
    _, // eslint-disable-line no-unused-vars
    varPart,
    valPart,
  ] = matches;
  return [varPart.trim(), valPart.trim()];
};

const matcherCore = (whole, splitVarValRegExp, afterSplit) => {
  const matches = groupMatch(whole, splitVarValRegExp);
  if (!matches) return null;
  return afterSplit(...matches);
};

const replaceByRegExps = (text, regExpObj) =>
  text.replace(regExpObj.before, regExpObj.after || '');

const varPartOmittingConditions = {
  typeScriptType: {
    before: /:.+$/,
  },
  plSqlType: {
    before: / .+$/,
  },
  generalDeclaration: {
    before: /^[^ ]+ /,
  },
  enclosers: {
    // なぜテキストエディターと違って
    // ^['"`]+|[`"']+$
    // で末尾側がヒットしないなのか
    before: /^[`"'[]+([^"']+)[`"'\]]+$/,
    after: '$1',
  },
};

// エディターの一般的なシンタックスハイライトのコメントを含んだ解釈順は恐らく
// 値の頭の記号でクォートされた要素を保護してそれより右にあるコメント開始記号からコメント扱い
// 文字列でないリテラルの場合どうしてんのかな…
const valPartOmittingConditions = {
  general: (omitting, options) => {
    // クォート
    const quoteMatches = omitting.match(/^(['"`])/);
    // ある場合
    if (quoteMatches) {
      const quote = quoteMatches[1];
      options.quote = quote;
      const topSliced = omitting.slice(1);
      const quoteRightIndex = topSliced.indexOf(quote);
      if (quoteRightIndex < 0) return omitting;
      return topSliced.slice(0, quoteRightIndex);
    }

    // CSSの#カラーコードについては他の言語のコメント記号と競合するので保護
    const cssColorCodeMatches = omitting.match(/^(#[0-9a-zA-Z]+);/);
    if (cssColorCodeMatches) return cssColorCodeMatches[1];

    // TODO: YAMLのヒアドキュメント文字列としての#どうしよう…

    // クォートない場合
    // アルゴリズム統合は断念
    const omitted = omitting
      .replace(/[//|/*|#|<-].+/, '')
      .replace(/ *[;,] *$/, '');
    return omitted;
  },
};

const Omitter = (omittingConditions) => (source) => {
  let omitting = source;
  const options = {};

  const omitters = Object.keys(omittingConditions).reduce(
    (obj, key) => ({
      ...obj,
      [key]: () => {
        const omittingCondition = omittingConditions[key];
        omitting =
          typeof omittingCondition === 'function'
            ? omittingCondition(omitting, options)
            : replaceByRegExps(omitting, omittingCondition);
        return omitters;
      },
    }),
    {
      done: () => {
        return {
          part: omitting,
          options,
        };
      },
    }
  );

  return omitters;
};

const VarPartOmitter = Omitter(varPartOmittingConditions);

const ValPartOmitter = Omitter(valPartOmittingConditions);

const toMatches = (varPart, valPart, options = {}) => ({
  varPart,
  valPart,
  options,
});

const omittedToMatches = (varPartOmitted, valPartOmitted) =>
  toMatches(varPartOmitted.part, valPartOmitted.part, valPartOmitted.options);

const matchers = {
  typeScript: (whole) =>
    matcherCore(whole, splitVarValRegExps.typeScript, (varPart, valPart) =>
      omittedToMatches(
        VarPartOmitter(varPart)
          .typeScriptType()
          .generalDeclaration()
          .enclosers()
          .done(),
        ValPartOmitter(valPart).general().done()
      )
    ),
  plSql: (whole) =>
    matcherCore(whole, splitVarValRegExps.plSql, (varPart, valPart) =>
      omittedToMatches(
        VarPartOmitter(varPart).plSqlType().enclosers().done(),
        ValPartOmitter(valPart).general().done()
      )
    ),
  general: (whole) =>
    matcherCore(whole, splitVarValRegExps.general, (varPart, valPart) =>
      omittedToMatches(
        VarPartOmitter(varPart).enclosers().generalDeclaration().done(),
        ValPartOmitter(valPart).general().done()
      )
    ),
};

const unmatched = (whole) =>
  toMatches('', ValPartOmitter(whole).general().done().part);

const matcherKeys = Object.keys(matchers);

const sequentialMatch = (whole) => {
  const recurse = (index = 0) => {
    const matcher = matchers[matcherKeys[index]];
    if (!matcher) return unmatched(whole);
    return matcher(whole) || recurse(index + 1);
  };
  return recurse();
};

const main = (sourceText) => {
  const sourceLines = sourceText.trim().split('\n');

  const results = sourceLines
    .filter((source) => source && !source.match(wholeCommentRegExp))
    .map((sourcePlain) => {
      const source = sourcePlain.trim();
      const matches = sequentialMatch(source);
      const { varPart, valPart, options } = matches;
      return { varPart, valPart, options };
    });
  return results;
};

export const splitSourceToVarValLines = main;

export default {
  splitSourceToVarValLines,
};
