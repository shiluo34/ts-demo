const path = require('path');

let _root = path.resolve(__dirname, '..');

const root = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

const resolve =function (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = { root, resolve };