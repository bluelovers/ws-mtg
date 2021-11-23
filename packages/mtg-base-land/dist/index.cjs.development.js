'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const _re = /^(Snow-Covered )?(.+)$/;
exports.EnumBaseLand = void 0;

(function (EnumBaseLand) {
  EnumBaseLand["Plains"] = "Plains";
  EnumBaseLand["Island"] = "Island";
  EnumBaseLand["Swamp"] = "Swamp";
  EnumBaseLand["Mountain"] = "Mountain";
  EnumBaseLand["Forest"] = "Forest";
})(exports.EnumBaseLand || (exports.EnumBaseLand = {}));

const BASE_LAND_ARRAY = /*#__PURE__*/Object.freeze(["Plains", "Island", "Swamp", "Mountain", "Forest"]);
const SNOW_BASE_LAND_ARRAY = /*#__PURE__*/Object.freeze( /*#__PURE__*/BASE_LAND_ARRAY.slice().map(toSnowBaseLand));
function isBaseLand(name) {
  return BASE_LAND_ARRAY.includes(name);
}
function parseSnowCoveredOrBaseLand(name) {
  var _m$;

  const m = _re.exec(name);

  return isBaseLand(m === null || m === void 0 ? void 0 : m[2]) && {
    name,
    snow: ((_m$ = m[1]) === null || _m$ === void 0 ? void 0 : _m$.length) > 0,
    type: m[2]
  };
}
function toSnowBaseLand(name) {
  const m = parseSnowCoveredOrBaseLand(name);

  if (m) {
    return m.snow ? m.name : `Snow-Covered ${m.type}`;
  }
}
function isSnowBaseLand(name) {
  const m = parseSnowCoveredOrBaseLand(name);
  return m === null || m === void 0 ? void 0 : m.snow;
}
function typeofBaseLand(name) {
  var _parseSnowCoveredOrBa;

  return (_parseSnowCoveredOrBa = parseSnowCoveredOrBaseLand(name)) === null || _parseSnowCoveredOrBa === void 0 ? void 0 : _parseSnowCoveredOrBa.type;
}

exports.BASE_LAND_ARRAY = BASE_LAND_ARRAY;
exports.SNOW_BASE_LAND_ARRAY = SNOW_BASE_LAND_ARRAY;
exports["default"] = parseSnowCoveredOrBaseLand;
exports.isBaseLand = isBaseLand;
exports.isSnowBaseLand = isSnowBaseLand;
exports.parseSnowCoveredOrBaseLand = parseSnowCoveredOrBaseLand;
exports.toSnowBaseLand = toSnowBaseLand;
exports.typeofBaseLand = typeofBaseLand;
//# sourceMappingURL=index.cjs.development.js.map
