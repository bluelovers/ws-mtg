'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.EnumImgSource = void 0;

(function (EnumImgSource) {
  EnumImgSource["gatherer"] = "gatherer";
  EnumImgSource["urzaCo"] = "urzaCo";
  EnumImgSource["scryfall"] = "scryfall";
  EnumImgSource["magicCardsInfo"] = "magicCardsInfo";
})(exports.EnumImgSource || (exports.EnumImgSource = {}));

function pad(num, size) {
  return String(num).padStart(size, '0');
}

exports.EnumScryfallImageFormat = void 0;

(function (EnumScryfallImageFormat) {
  EnumScryfallImageFormat["small"] = "small";
  EnumScryfallImageFormat["normal"] = "normal";
  EnumScryfallImageFormat["large"] = "large";
  EnumScryfallImageFormat["png"] = "png";
  EnumScryfallImageFormat["art_crop"] = "art_crop";
  EnumScryfallImageFormat["border_crop"] = "border_crop";
})(exports.EnumScryfallImageFormat || (exports.EnumScryfallImageFormat = {}));

function handleName(name) {
  return name.split(/\s*\/\/\s*/)[0];
}

function getImageSourceURL(card, config) {
  let imgUrl;
  const cardNum = card.collectors;

  switch (config === null || config === void 0 ? void 0 : config.imgSource) {
    case "magicCardsInfo":
    case "scryfall":
      if (!cardNum) {
        var _card$name;

        if (card.multiverseid) {
          imgUrl = `https://api.scryfall.com/cards/multiverse/${card.multiverseid}?format=image`;
        } else if (card.mtgoID) {
          imgUrl = new URL(`https://api.scryfall.com/cards/mtgo/${card.mtgoID}`);
        } else if (((_card$name = card.name) === null || _card$name === void 0 ? void 0 : _card$name.length) > 0) {
          imgUrl = new URL(`https://api.scryfall.com/cards/named`);
          imgUrl.searchParams.set('fuzzy', card.name);
        } else {
          throw new TypeError(`Invalid collector number: ${cardNum}`);
        }
      } else {
        var _config$language;

        const language = (_config$language = config === null || config === void 0 ? void 0 : config.language) !== null && _config$language !== void 0 ? _config$language : 'en';
        imgUrl = `https://api.scryfall.com/cards/${card.set.toLowerCase()}/${cardNum}/${language}`;
      }

      if (typeof imgUrl === 'string') {
        imgUrl = new URL(imgUrl);
      }

      imgUrl.searchParams.set('format', 'image');

      if (config !== null && config !== void 0 && config.imageFormat) {
        imgUrl.searchParams.set('version', config.imageFormat);
      }

      if (config !== null && config !== void 0 && config.imageFaceBack) {
        imgUrl.searchParams.set('face', 'back');
      }

      break;

    case "urzaCo":
      if (!cardNum) {
        throw new TypeError(`Invalid collector number: ${cardNum}`);
      }

      let paddedNum = pad(cardNum, 3);

      if (isNaN(paddedNum.slice(-1))) {
        paddedNum = pad(paddedNum, 4);
      }

      imgUrl = `https://s3.urza.co/cards/${card.set.toLowerCase()}/front/200dpi/${paddedNum}.jpg`;
      break;

    default:
      if (!card.multiverseid) {
        var _card$name2;

        if ((_card$name2 = card.name) !== null && _card$name2 !== void 0 && _card$name2.length) {
          imgUrl = new URL(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card`);
          imgUrl.searchParams.set('name', handleName(card.name));
        } else {
          throw new TypeError(`Invalid multiverseid: ${card.multiverseid}`);
        }
      } else {
        imgUrl = `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`;
      }

      break;
  }

  if (typeof imgUrl === 'string') {
    imgUrl = new URL(imgUrl);
  }

  return imgUrl;
}

exports["default"] = getImageSourceURL;
exports.getImageSourceURL = getImageSourceURL;
//# sourceMappingURL=index.cjs.development.cjs.map
