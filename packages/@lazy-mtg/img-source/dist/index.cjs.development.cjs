'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var linkSource = require('@lazy-mtg/link-source');

exports.EnumImgSource = void 0;

(function (EnumImgSource) {
  EnumImgSource["gatherer"] = "gatherer";
  EnumImgSource["urzaCo"] = "urzaCo";
  EnumImgSource["scryfall"] = "scryfall";
  EnumImgSource["magicCardsInfo"] = "magicCardsInfo";
})(exports.EnumImgSource || (exports.EnumImgSource = {}));

exports.EnumScryfallImageFormat = void 0;

(function (EnumScryfallImageFormat) {
  EnumScryfallImageFormat["small"] = "small";
  EnumScryfallImageFormat["normal"] = "normal";
  EnumScryfallImageFormat["large"] = "large";
  EnumScryfallImageFormat["png"] = "png";
  EnumScryfallImageFormat["art_crop"] = "art_crop";
  EnumScryfallImageFormat["border_crop"] = "border_crop";
})(exports.EnumScryfallImageFormat || (exports.EnumScryfallImageFormat = {}));

function getImageSourceURL(card, config) {
  var _config$imgSource;

  let linkUrl;
  const cardNum = card.collectors;

  switch ((_config$imgSource = config === null || config === void 0 ? void 0 : config.imgSource) !== null && _config$imgSource !== void 0 ? _config$imgSource : config === null || config === void 0 ? void 0 : config.linkSource) {
    case "magicCardsInfo":
    case "scryfall":
      if (!cardNum) {
        var _card$name;

        if (card.multiverseid) {
          linkUrl = `https://api.scryfall.com/cards/multiverse/${card.multiverseid}?format=image`;
        } else if (card.mtgoID) {
          linkUrl = new URL(`https://api.scryfall.com/cards/mtgo/${card.mtgoID}`);
        } else if (((_card$name = card.name) === null || _card$name === void 0 ? void 0 : _card$name.length) > 0) {
          linkUrl = new URL(`https://api.scryfall.com/cards/named`);
          linkUrl.searchParams.set('fuzzy', card.name);
        } else {
          throw new TypeError(`Invalid collector number: ${cardNum}`);
        }
      } else {
        var _config$language;

        const language = (_config$language = config === null || config === void 0 ? void 0 : config.language) !== null && _config$language !== void 0 ? _config$language : "en";
        linkUrl = `https://api.scryfall.com/cards/${card.set.toLowerCase()}/${cardNum}/${language}`;
      }

      linkUrl = linkSource._toURL(linkUrl);
      linkUrl.searchParams.set('format', 'image');

      if (config !== null && config !== void 0 && config.imageFormat) {
        linkUrl.searchParams.set('version', config.imageFormat);
      }

      if (config !== null && config !== void 0 && config.imageFaceBack) {
        linkUrl.searchParams.set('face', 'back');
      }

      break;

    case "urzaCo":
      if (!cardNum) {
        throw new TypeError(`Invalid collector number: ${cardNum}`);
      }

      let paddedNum = linkSource._padZero(cardNum, 3);

      if (isNaN(paddedNum.slice(-1))) {
        paddedNum = linkSource._padZero(paddedNum, 4);
      }

      linkUrl = `https://s3.urza.co/cards/${card.set.toLowerCase()}/front/200dpi/${paddedNum}.jpg`;
      break;

    default:
      if (!card.multiverseid) {
        var _card$name2;

        if ((_card$name2 = card.name) !== null && _card$name2 !== void 0 && _card$name2.length) {
          linkUrl = new URL(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card`);
          linkUrl.searchParams.set('name', linkSource._handleName(card.name));
        } else {
          throw new TypeError(`Invalid multiverseid: ${card.multiverseid}`);
        }
      } else {
        linkUrl = `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`;
      }

      break;
  }

  return linkSource._toURL(linkUrl);
}

exports["default"] = getImageSourceURL;
exports.getImageSourceURL = getImageSourceURL;
//# sourceMappingURL=index.cjs.development.cjs.map
