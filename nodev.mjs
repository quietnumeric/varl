// node.js(+node-dev)を動かしたい時に使う
// 非UIの特にPOJOプログラミングにおいては、コンソールに出力しながら
// node-devの保存時再実行を繰り返す方が手っ取り早い

// eslint-disable-next-line no-unused-vars
import colors from 'colors';
// このルール、mjsの場合だけ.js許容とか無理では
// eslint-disable-next-line import/extensions
import { splitSourceToVarValLines } from './libs/split-source-to-var-val-lines.js';
// eslint-disable-next-line import/extensions
import { developingTestSource } from './libs/testing-sources.js';
// eslint-disable-next-line import/extensions
import { testVarValSplitter } from './test/split-to-var-val-test.js';
// eslint-disable-next-line import/extensions
import { formatterDefines } from './libs/formatter-defines.js';
// eslint-disable-next-line import/extensions
import { formatSourceVarValLines } from './libs/format-source-var-val-lines.js';

/* importするモジュール側にエラーがあると、
コンソールエラーとしては結構わかりにくい出方をする(mjs特有)ので注意 */

const headLog = (head) => console.log(` ${head} `.bgWhite.black);

const formatterDefineIndex = 0;

const formatterDefine = formatterDefines[formatterDefineIndex];
const sources = developingTestSource;
const sourceVarValLines = splitSourceToVarValLines(sources);
headLog('test - splitSourceToVarVal');
testVarValSplitter.begin(sourceVarValLines);
const results = formatSourceVarValLines(sourceVarValLines, formatterDefine);
headLog('format results');
console.log(results);
headLog('using formatter-define');
console.log(formatterDefine);

console.log('------------------------- done at', new Date());
