/*
// Usage:
// Object.defineProperty()を利用して、発信専用オブジェクト(使い手から見れば読取専用オブジェクト、
// 作り手から見ればプロパティに再代入可能なオブジェクト)を生成する関数

const private = {
  valueProp: 'foo',
  nestedProp: {
    nestedValueProp: 'bar',
  },
};

const readOnly = createReadOnlyRef(private);

readOnly.valueProp = 'hoge';
readOnly.nestedProp.nestedValueProp = 'moge';
console.log(readOnly.valueProp); // foo
console.log(readOnly.nestedProp.nestedValueProp); // bar

private.valueProp = 'hoge';
private.nestedProp.nestedValueProp = 'moge';
console.log(readOnly.valueProp); // hoge
console.log(readOnly.nestedProp.nestedValueProp); // moge
*/

export const createReadOnlyRef = (src, dst = {}) => {
  const recurse = (referringSrc, readOnlyDst) =>
    Object.keys(referringSrc).reduce((generating, key) => {
      Object.defineProperty(generating, key, {
        set: () => {},
        get: () => {
          const mayObject = referringSrc[key];
          return mayObject !== null && typeof mayObject === 'object'
            ? recurse(mayObject, {})
            : referringSrc[key];
        },
      });
      // Object.keys()やスプレッド構文ではそのobjectに実在するkeyしか挙がらない、つまり
      // Object.defineProperty()で新規追加したgetterは実在するkeyじゃないので、
      // immutableなreduceでよくやる新規objectに展開し直してのreturnは無理
      return generating;
    }, readOnlyDst);
  return recurse(src, dst);
};

export default {
  createReadOnlyRef,
};
