// なるべくsplit-to-var-val-test.jsと同じ字面に
const forFormatter = `
const str = '文字列';
const num = 123;
const bool = true;
const position = before = after;
const equals = 'a = b';
const ts: type = 'value';
const includes ^= 333;
const greater >= 333;
const smaller <= 333;
string = '"クォート組み合わせおかしい'";
'string' = 'シングルクォート';
"string" = 'ダブルクォート';
'"multi-quote"' = 'シングルダブルクォート';
"'multi-quote'" = 'ダブルシングルクォート';
pl_sql_var VARCHAR (100) := 'tekisuto';
str: '文字列',
num: 123,
bool: true,
position: before = after,
equals: 'a = b',
[camelKey]: 'camelKey',
[snake_key]: 'snake_key',
['kebab-key']: 'kebab-key',
'string': 'クォート';
"'multi-quote'": 'マルチクォート';
yamlKey: yamlVal
css-color-code: #1Ab;
css-color-code: #1Ab; #aaa;
'値だけ';
# こめ
// こめ
<--! こめ
const riceEarly21 = 21;
const riceEarly21 = 21; // こめ
const riceEarly21 = 21; /* こぬ
const riceEarly21 = 21; # こぬ
const riceEarly21 = 21; <--! こぬ
const riceEarly = '#こめあり';
const riceEarly = '//こめあり';
const riceEarly = '<こめあり';
const riceEarly = '#こめあり# こめ'; # こめ'
const riceEarly = '//こめあり// こめ'; // こめ
const riceEarly = '<こめあり<--! こめ'; <--! こめ
const riceEarly = '#こめあり'; # こめ'
const riceEarly = '//こめあり'; // こめ' // こめ'
const riceEarly = '<こめあり'; <--! こめ'
`.trim();

const forScroll = `
const str = '文字列';
const num = 123;
const bool = true;
const position = before = after;
const equals = 'a = b';
const ts: type = 'value';
const includes ^= 333;
const greater >= 333;
const smaller <= 333;
string = '"クォート組み合わせおかし
'string' = 'シングルクォート';
"string" = 'ダブルクォート';
'"multi-quote"' = 'シングルダブルク
"'multi-quote'" = 'ダブルシングルク
pl_sql_var VARCHAR (100) := 'tekisutoa
str: '文字列',
num: 123,
bool: true,
const riceEarly21 = 21;
const riceEarly21 = 21; // こめ
const riceEarly21 = 21; /* こぬ
const riceEarly21 = 21; # こぬ
const riceEarly21 = 21; <--!
const riceEarly = '#こめあり';
const riceEarly = '//こめあり';
const riceEarly = '<こめあり';
const riceEarly = '#こめあり#
const riceEarly = '//こめあり//
const riceEarly = '<こめあり<--!
const riceEarly = '#こめあり'; #
const riceEarly = '//こめあり'; /
const riceEarly = '<こめあり'; <-
`.trim();

export const replacingTestSource = forFormatter;
export const developingTestSource = forFormatter;

export default {
  replacingTestSource,
  developingTestSource,
};
