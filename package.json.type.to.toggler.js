// cjsとmjsとで許容シンタックスが厳密に違って双方向けに同時にexportできないので
// Eval系のFunction解釈で読み込ませるとかいうクソミソテクニックでなんとかする
// cjs: require/module.exports/exports.var
// mjs: import/export.default/export
const Toggler = (fs) => (nextType) => {
  const fileName = 'package.json';

  const packageJsonStr = fs.readFileSync(fileName);
  const packageJson = JSON.parse(packageJsonStr);
  const currentType = packageJson.type;
  packageJson.type = nextType;
  fs.writeFileSync(
    fileName,
    `${JSON.stringify(packageJson, null, '  ')}
`
  );

  console.log(`package.json.type.to.${nextType}`);
  console.log(`toggled: ${currentType} -> ${nextType}`);
};
// このreturnは必要
return Toggler;

/*
--------- defined-function.js
const definedFunction = (arg) => console.log(arg);
--------- --------- ---------

--------- main.js
const moduleText = fs.readFileSync('./defined-function.js', 'utf-8');
const evaluatedFunction = Function(moduleText);
console.log(evaluatedFunction.toString());
// 評価された文字列は無名関数の中身として扱われる
function anonymous() {
  const definedFunction = (arg) => console.log(arg);
}
const returnValue = anonymous(); // returnValueはundedined;
// ので、definedFunction自体をreturnするステートメントまでテキストとして読み込ませることで
const evaluatedFunction = Function(fs.readFileSync('./defined-function.js', 'utf-8'))
console.log(evaluatedFunction.toString());
// evaluatedFunctionを返す無名関数の中身として扱われる
function anonymous() {
  const definedFunction = (arg) => console.log(arg);
  return definedFunction;
}
const returnValue = anonymous(); // returnValueはdefinedFunction;
*/
/*
// 文字列としてreturnステートメントを付け足しても動くけど、ナンセンス
const moduleText = fs.readFileSync('./defined-function.js', 'utf-8');
const evaluatedFunction = Function(`
  ${moduleText}
  return definedFunction;
`);
*/
