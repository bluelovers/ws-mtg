'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const COLOR_PRIORITY = /*#__PURE__*/Object.freeze(["W", "U", "B", "R", "G"]);
function getColorTitle(color_identity) {
  color_identity = [color_identity].flat();

  if (color_identity.length === 0) {
    return "Colorless";
  } else if (color_identity.length === 1) {
    assertColorIdentity(color_identity[0]);
    return EnumColorTitle[color_identity[0]];
  }

  return "Multi colored";
}
function isColorIdentity(color_identity) {
  return COLOR_PRIORITY.includes(color_identity);
}
function assertColorIdentity(color_identity) {
  if (!isColorIdentity(color_identity)) {
    throw new TypeError(`Invalid Color Identity: ${color_identity}`);
  }
}
function isColorIdentityArray(color_identity) {
  return color_identity.every(isColorIdentity);
}
function assertColorIdentityArray(color_identity) {
  color_identity.forEach(assertColorIdentity);
}
function isColorIdentityLazy(color_identity) {
  return isColorIdentityArray([color_identity].flat());
}
function assertColorIdentityLazy(color_identity) {
  return assertColorIdentityArray([color_identity].flat());
}

exports.COLOR_PRIORITY = COLOR_PRIORITY;
exports.assertColorIdentity = assertColorIdentity;
exports.assertColorIdentityArray = assertColorIdentityArray;
exports.assertColorIdentityLazy = assertColorIdentityLazy;
exports["default"] = isColorIdentityLazy;
exports.getColorTitle = getColorTitle;
exports.isColorIdentity = isColorIdentity;
exports.isColorIdentityArray = isColorIdentityArray;
exports.isColorIdentityLazy = isColorIdentityLazy;
//# sourceMappingURL=index.cjs.development.cjs.map
