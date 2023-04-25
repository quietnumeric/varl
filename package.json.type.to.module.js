if (typeof require === 'undefined') {
  console.log('package.json.type.to.module');
  console.log('type is already module(require is not defined).');
  process.exit(0);
}

const fs = require('fs');

// eslint-disable-next-line no-new-func
const evaluatedFunction = Function(
  fs.readFileSync('./package.json.type.to.toggler.js', 'utf-8')
);
evaluatedFunction()(fs)('module');
