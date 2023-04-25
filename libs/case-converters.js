export const caseConverters = (() => {
  const topTo = (str, caseFuncName) =>
    str.charAt(0)[caseFuncName]() + str.slice(1);
  const topToUpper = (str) => topTo(str, 'toUpperCase');
  const topToLower = (str) => topTo(str, 'toLowerCase');

  const camel = (str) =>
    topToLower(str.replace(/^[-_]/, '')).replace(/[-_](.)/g, (match, group1) =>
      group1.toUpperCase()
    );

  const separate = (str, symbol) =>
    camel(str).replace(/[A-Z]/g, (top) => symbol + top.charAt(0).toLowerCase());

  const snake = (str) => separate(str, '_');

  const kebab = (str) => separate(str, '-');

  const pascal = (str) => topToUpper(camel(str));

  return {
    kebab,
    snake,
    camel,
    pascal,
  };
})();

export default {
  caseConverters,
};
