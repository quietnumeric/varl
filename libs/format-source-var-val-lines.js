const noFormatter = ({ varPart, valPart }) =>
  `${varPart || ''}${varPart && valPart ? ' ' : ''}${valPart || ''}`;

// 多分、いろんなエディターの検索機能の「単語単位で検索」を実現する正規表現はこう
const wholeWordRegExp = /(^|(?<=[^a-zA-Z0-9_-]))finding($|(?=[^a-zA-Z0-9_-]))/;
const toWholeWordRegExp = (finding) =>
  new RegExp(`(^|(?<=[^a-zA-Z0-9_-]))${finding}($|(?=[^a-zA-Z0-9_-]))`, 'g');

// でもプレフィックス/サフィックス付与とか、単純連結には↑は不向き
// テンプレート側なのでそんな変なものが投入されないことを前提に
const escapeEncloserLeft = '<<<<<';
const escapeEncloserRight = '>>>>>';

const toEscapedFinding = (...findings) =>
  findings.map(
    (finding) => `${escapeEncloserLeft}${finding}${escapeEncloserRight}`
  );
const doEscapeFindingRegExp = (...findings) =>
  findings.map(
    (finding) =>
      new RegExp(`${escapeEncloserLeft}${finding}${escapeEncloserRight}`, 'g')
  );

const formatterToMapper = (formatter) =>
  formatter
    ? (() => {
        const {
          label,
          trimLabel,
          varFind,
          valFind,
          varFunc,
          valFunc,
          forceQuote,
        } = formatter;
        // indexOfでインデックス探して、varとかval抽出後にまたインデックス探して、は面倒

        // 多分、いろんなエディターの検索機能の「単語単位で検索」はこれかな
        const varFindsFixed = (() => {
          if (!varFind) return ['var'];
          return Array.isArray(varFind) ? varFind : [varFind];
        })();

        const valFindFixed = valFind || 'val';
        const varFindsFixedEscaped = toEscapedFinding(...varFindsFixed);
        const valFindFixedEscaped = toEscapedFinding(valFindFixed)[0];
        const varFindsRegExp = doEscapeFindingRegExp(...varFindsFixed);
        const valFindRegExp = doEscapeFindingRegExp(valFindFixed)[0];
        const trimmedLabel = trimLabel ? label.trim() : label;
        const labelEscapedFinding = varFindsFixed
          .reduce(
            (replaced, varFindFixed, index) =>
              replaced.replace(
                new RegExp(varFindFixed, 'g'),
                varFindsFixedEscaped[index]
              ),
            trimmedLabel
          )
          .replace(new RegExp(valFindFixed, 'g'), valFindFixedEscaped);
        return ({ varPart, valPart, options }) => {
          const varPartRep = varFunc ? varFunc(varPart) : varPart;
          const varPartsRep = Array.isArray(varPartRep)
            ? varPartRep
            : [varPartRep];
          const valPartPepImd = valFunc ? valFunc(valPart) : valPart;
          const valPartRep = forceQuote
            ? valPartPepImd
            : (options.quote || '') + valPartPepImd + (options.quote || '');

          return varFindsRegExp
            .reduce(
              (replaced, varFindRegExp, index) =>
                replaced.replace(varFindRegExp, varPartsRep[index]),
              labelEscapedFinding
            )
            .replace(valFindRegExp, valPartRep);
        };
      })()
    : noFormatter;

export const formatSourceVarValLines = (
  splittedSourceVarValLines,
  formatter
) => {
  const mapper = formatterToMapper(formatter);
  return splittedSourceVarValLines.map(mapper).join('\n');
};

export default {
  formatSourceVarValLines,
};
