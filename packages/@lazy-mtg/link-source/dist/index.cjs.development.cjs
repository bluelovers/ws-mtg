'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var escapeStringRegexp = require('escape-string-regexp');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var escapeStringRegexp__default = /*#__PURE__*/_interopDefaultLegacy(escapeStringRegexp);

exports.EnumLinkSource = void 0;

(function (EnumLinkSource) {
  EnumLinkSource["gatherer"] = "gatherer";
  EnumLinkSource["urzaCo"] = "urzaCo";
  EnumLinkSource["scryfall"] = "scryfall";
  EnumLinkSource["magicCardsInfo"] = "magicCardsInfo";
  EnumLinkSource["comboDeck"] = "comboDeck";
})(exports.EnumLinkSource || (exports.EnumLinkSource = {}));

exports.EnumScryfallLanguages = void 0;

(function (EnumScryfallLanguages) {
  EnumScryfallLanguages["English"] = "en";
  EnumScryfallLanguages["Japanese"] = "ja";
  EnumScryfallLanguages["SimplifiedChinese"] = "zhs";
  EnumScryfallLanguages["TraditionalChinese"] = "zht";
  EnumScryfallLanguages["Phyrexian"] = "ph";
})(exports.EnumScryfallLanguages || (exports.EnumScryfallLanguages = {}));

function _handleName(name) {
  return name.split(/\s*\/\/\s*/)[0];
}
function _toURL(linkUrl) {
  if (typeof linkUrl === 'string') {
    linkUrl = new URL(linkUrl);
  }

  return linkUrl;
}
function _padZero(num, size) {
  return String(num).padStart(size, '0');
}
function getLinkSourceURL(card, config) {
  var _card$name, _card$name2, _card$name3;

  let linkUrl;

  switch (config === null || config === void 0 ? void 0 : config.linkSource) {
    case "magicCardsInfo":
    case "scryfall":
      linkUrl = `https://scryfall.com/search?q=`;

      if (card.multiverseid) {
        linkUrl += `multiverseid=${card.multiverseid}`;
      } else if (card.mtgoID) {
        linkUrl += `mtgoID=${card.mtgoID}`;
      } else if (card.set && card.collectors) {
        linkUrl += `set:${card.set.toLowerCase()} number:${card.collectors}`;
      } else if (!((_card$name = card.name) !== null && _card$name !== void 0 && _card$name.length)) {
        throw new TypeError(`Invalid name: ${card.name}`);
      } else {
        linkUrl += `name:/(?<=\\/\\/ |^)${escapeStringRegexp__default["default"](card.name).replace(/\//g, '\\/')}(?= \\/\\/|$)/`;
      }

      if (config !== null && config !== void 0 && config.language) {
        linkUrl += ` lang:${config.language}`;
      }

      break;

    case "urzaCo":
      if (!((_card$name2 = card.name) !== null && _card$name2 !== void 0 && _card$name2.length)) {
        throw new TypeError(`Invalid name: ${card.name}`);
      }

      linkUrl = new URL(`https://urza.co/m/cards`);
      linkUrl.searchParams.set('q', card.name);
      break;

    case "comboDeck":
      if (!((_card$name3 = card.name) !== null && _card$name3 !== void 0 && _card$name3.length)) {
        throw new TypeError(`Invalid name: ${card.name}`);
      }

      linkUrl = new URL(`http://combodeck.net/Query/${encodeURIComponent(card.name)}`);
      break;

    default:
      if (!card.multiverseid) {
        var _card$name4;

        if ((_card$name4 = card.name) !== null && _card$name4 !== void 0 && _card$name4.length) {
          linkUrl = new URL(`https://gatherer.wizards.com/Pages/Card/Details.aspx?type=card`);
          linkUrl.searchParams.set('name', _handleName(card.name));
        } else {
          throw new TypeError(`Invalid multiverseid: ${card.multiverseid}`);
        }
      } else {
        linkUrl = `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}&type=card`;
      }

      break;
  }

  return _toURL(linkUrl);
}

exports._handleName = _handleName;
exports._padZero = _padZero;
exports._toURL = _toURL;
exports["default"] = getLinkSourceURL;
exports.getLinkSourceURL = getLinkSourceURL;
//# sourceMappingURL=index.cjs.development.cjs.map
