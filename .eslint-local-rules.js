/*
エディター側プラグインの反映確認には再起動が必要なケースがあるので注意
ドットで始まるファイルはデフォルトでignoreされるので、.eslintignoreに
!.eslint-local-rules.js
を追記してignoreをignore
*/

const ruleDefines = {
  avoidUsingThis: {
    name: 'avoid-using-this',
    message:
      'そのthisはvueインスタンスでは？必要に応じてeslint-disableしてください',
  },
};
const titlize = {
  vue: (name) => `vue/${name}`,
};

const rules = {};

const createRuleAvoidUsingThis = (applyingRegExp, doIgnoreFunc) => ({
  create: (context) => ({
    ThisExpression: (node) => {
      if (!applyingRegExp.test(context.getFilename().replace(/\\/g, '/')))
        return;
      if (doIgnoreFunc && doIgnoreFunc(node)) return;
      context.report({
        node,
        message: ruleDefines.avoidUsingThis.message,
      });
    },
  }),
});

rules[titlize.vue(ruleDefines.avoidUsingThis.name)] = createRuleAvoidUsingThis(
  /\.vue$/,
  (node) => {
    const isInnerVueInstanceRecurse = (parentNode) => {
      if (!parentNode) return false;
      if (parentNode.type === 'ExportDefaultDeclaration') return true;
      return isInnerVueInstanceRecurse(parentNode.parent);
    };
    return isInnerVueInstanceRecurse(node.parent);
  }
);

module.exports = rules;
