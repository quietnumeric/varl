/*
// Usage:
// setTimeout()を利用して、指定ミリ秒を待つだけの関数
// (技術コミュニティーに載っていることも多いはずのコード)

await setTimewait(1000);
*/

export const setTimewait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export default setTimewait;
