// mjsから呼ぶ場合は呼び出し先も拡張子不可避に…
// eslint-disable-next-line import/extensions
import { caseConverters } from './case-converters.js';

const { kebab, snake, camel, pascal } = caseConverters;

const toVarsFunc =
  (...usingCaseConverters) =>
  (varPart) =>
    usingCaseConverters.map((caseConverter) => caseConverter(varPart));

const toFuncCamelFormatterDefine = (verb, label) => ({
  type: 'func',
  label,
  trimLabel: true,
  varFind: ['PascalCase', 'camelCase'],
  varFunc: toVarsFunc(pascal, camel),
});

const toVueFuncFormatterDefine = (symbol) => ({
  type: 'vue',
  label: `${symbol}kebab-case="camelCase"`,
  varFind: ['kebab-case', 'camelCase'],
  varFunc: toVarsFunc(kebab, camel),
});

export const formatterDefines = [
  {
    type: 'js',
    label: 'const var = val;',
  },
  {
    type: 'js',
    label: 'let var = val;',
  },
  {
    type: 'js',
    label: 'var: val,',
  },
  {
    type: 'js',
    label: "val: 'val',",
    forceQuote: true,
  },
  {
    type: 'js',
    label: 'camelCase: val,',
    varFind: 'camelCase',
    varFunc: camel,
  },
  {
    type: 'js',
    label: "camelCase: 'val',",
    forceQuote: true,
    varFind: 'camelCase',
    varFunc: camel,
  },
  {
    type: 'js',
    label: 'val,',
  },
  {
    type: 'json',
    label: '"var": "val",',
    forceQuote: true,
  },
  {
    type: 'yaml',
    label: 'var: val',
    forceQuote: true,
  },
  {
    type: 'yaml',
    label: '- val',
    forceQuote: true,
  },
  {
    type: 'html',
    label: 'kebab-case="val"',
    forceQuote: true,
    varFind: 'kebab-case',
    varFunc: kebab,
  },
  {
    type: 'vue',
    label: ':kebab-case="val"',
    forceQuote: true,
    varFind: 'kebab-case',
    varFunc: kebab,
  },
  toVueFuncFormatterDefine('@'),
  toVueFuncFormatterDefine(':'),
  {
    type: 'css',
    label: 'kebab-case: val;',
    forceQuote: true,
    varFind: 'kebab-case',
    varFunc: kebab,
  },
  {
    type: 'sql',
    label: 'snake_case: val;',
    varFind: 'snake_case',
    varFunc: snake,
  },
  toFuncCamelFormatterDefine(
    'set',
    `
const setPascalCase = (camelCase) => {

};`
  ),
  toFuncCamelFormatterDefine(
    'get',
    `
const getPascalCase = () => {
  return camelCase;
};`
  ),
  toFuncCamelFormatterDefine(
    'on',
    `
const onPascalCase = (camelCase) => {

};`
  ),
];

export default {
  formatterDefines,
};
