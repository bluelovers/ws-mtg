'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colorType = require('@lazy-mtg/color-type');

function compareWUBRG(a, b) {
  const c1 = a[0];
  const c2 = b[0];
  const len1 = c1 === null || c1 === void 0 ? void 0 : c1.length;
  const len2 = c2 === null || c2 === void 0 ? void 0 : c2.length;

  if (!len1 || !len2) {
    if (len1) {
      return 1;
    } else if (len2) {
      return -1;
    }

    return 0;
  }

  const v1 = colorType.COLOR_PRIORITY.indexOf(c1);
  const v2 = colorType.COLOR_PRIORITY.indexOf(c2);

  if (v1 === v2) {
    return compareWUBRG(a.slice(1), b.slice(1));
  }

  return v1 > v2 ? 1 : -1;
}

Object.defineProperty(exports, 'COLOR_PRIORITY', {
	enumerable: true,
	get: function () { return colorType.COLOR_PRIORITY; }
});
Object.defineProperty(exports, 'EnumColor', {
	enumerable: true,
	get: function () { return colorType.EnumColor; }
});
exports.compareWUBRG = compareWUBRG;
exports["default"] = compareWUBRG;
//# sourceMappingURL=index.cjs.development.cjs.map
