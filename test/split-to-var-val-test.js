// なるべくtesting-sources.jsと同じ字面に
const expectingTestSource = [
  ['str', '文字列'],
  ['num', '123'],
  ['bool', 'true'],
  ['position', 'before = after'],
  ['equals', 'a = b'],
  ['ts', 'value'],
  ['includes', '333'],
  ['greater', '333'],
  ['smaller', '333'],
  ['string', '"クォート組み合わせおかしい'],
  ['string', 'シングルクォート'],
  ['string', 'ダブルクォート'],
  ['multi-quote', 'シングルダブルクォート'],
  ['multi-quote', 'ダブルシングルクォート'],
  ['pl_sql_var', 'tekisuto'],
  ['str', '意図的にNG'], // 意図的にNG
  ['num', '123'],
  ['bool', 'true'],
  ['position', 'after'],
  ['equals', 'a = b'],
  ['camelKey', 'camelKey'],
  ['snake_key', 'snake_key'],
  ['kebab-key', 'kebab-key'],
  ['string', 'クォート'],
  ['multi-quote', 'マルチクォート'],
  ['yamlKey', 'yamlVal'],
  ['css-color-code', '#1Ab'],
  ['css-color-code', '#1Ab'],
  ['', '値だけ'],
  ['riceEarly21', '21'],
  ['riceEarly21', '21'],
  ['riceEarly21', '21'],
  ['riceEarly21', '21'],
  ['riceEarly21', '21'],
  ['riceEarly', '#こめあり'],
  ['riceEarly', '//こめあり'],
  ['riceEarly', '<こめあり'],
  ['riceEarly', '#こめあり# こめ'],
  ['riceEarly', '//こめあり// こめ'],
  ['riceEarly', '<こめあり<--! こめ'],
  ['riceEarly', '#こめあり'],
  ['riceEarly', '//こめあり'],
  ['riceEarly', '<こめあり'],
];

export const testVarValSplitter = (() => {
  const calcMaxScale = (varValObjects, key) => {
    const lengths = Object.values(varValObjects).map(
      (varValObject) => varValObject[key].length
    );
    return Math.max(...lengths);
  };
  const calcMaxScaleVarPart = (varValObjects) =>
    calcMaxScale(varValObjects, 'varPart');

  const padLr = (str) => ` ${str} `;
  const ok = padLr('ok').bgGreen.blue;
  const ng = padLr('ng').bgRed.white;
  const toResultHead = (str) => str.grey;
  const resultHeadVar = toResultHead('var ');
  const resultHeadVal = toResultHead('-> val ');
  const test = (actuals) => {
    const expectingsNamed = expectingTestSource.map(([varPart, valPart]) => ({
      varPart,
      valPart,
    }));

    const scales = {
      index: expectingsNamed.length.toString().length,
      expectingVarPart: calcMaxScaleVarPart(expectingsNamed),
      actualVarPart: calcMaxScaleVarPart(actuals),
      // valPart側は長い可能性やマルチバイト文字もあるので揃えない
    };

    const each = (index) => {
      const actual = actuals[index];
      const expectings = expectingsNamed[index];
      const compare = (key) => (expectings[key] === actual[key] ? ok : ng);
      const compareVarPart = () => compare('varPart');
      const compareValPart = () => compare('valPart');
      console.log(
        `[${index.toString().padStart(scales.index)}]`,
        resultHeadVar + compareVarPart(),
        expectings.varPart.padEnd(scales.expectingVarPart),
        actual.varPart.padEnd(scales.actualVarPart),
        resultHeadVal + compareValPart(),
        expectings.valPart,
        actual.valPart
      );
    };

    expectingTestSource.forEach((_, index) => each(index));
  };

  return {
    begin: (actuals) => test(actuals),
  };
})();

export default {
  testVarValSplitter,
};
