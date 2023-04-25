import fs from 'fs';

// eslint-disable-next-line no-new-func
const evaluatedFunction = Function(
  fs.readFileSync('./package.json.type.to.toggler.js', 'utf-8')
);
evaluatedFunction()(fs)('commonjs');
