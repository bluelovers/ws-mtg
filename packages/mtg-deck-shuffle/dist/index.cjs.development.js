'use strict';

var mtgDecklistToLibrary = require('mtg-decklist-to-library');
var seedrandom = require('random-extra/preset/seedrandom');
var arrayChunkSplit = require('array-chunk-split');
var mtgBaseLand = require('mtg-base-land');

function getRandomFromOptions(options) {
  var _options$random;

  const random = (_options$random = options === null || options === void 0 ? void 0 : options.random) !== null && _options$random !== void 0 ? _options$random : seedrandom.seedrandom;
  return random;
}

function splitChunk(cards, maxChunkLength) {
  return arrayChunkSplit.arrayChunkSplit(cards, maxChunkLength !== null && maxChunkLength !== void 0 ? maxChunkLength : 12);
}

function splitThenMerge(cards, options) {
  let arr = splitChunk(cards, options === null || options === void 0 ? void 0 : options.maxChunkLength);
  return getRandomFromOptions(options).arrayShuffle(arr, true).flat();
}

function filterLands(cards) {
  return cards.reduce((data, card) => {
    let info = mtgBaseLand.parseSnowCoveredOrBaseLand(card.name);

    if (!info) {
      data.others.push(card);
    } else if (info !== null && info !== void 0 && info.snow) {
      data.snowLands.push(card);
    } else {
      data.baseLands.push(card);
    }

    return data;
  }, {
    baseLands: [],
    snowLands: [],
    others: []
  });
}

function groupByName(cards) {
  return cards.reduce((map, card) => {
    var _card$name, _map$_card$name;

    (_map$_card$name = map[_card$name = card.name]) !== null && _map$_card$name !== void 0 ? _map$_card$name : map[_card$name] = [];
    map[card.name].push(card);
    return map;
  }, {});
}

function createGroupArray(length) {
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push([]);
  }

  return arr;
}

function distributeGroup(group) {
  let arr = createGroupArray(4);
  const names = Object.keys(group);
  let card;
  let i = arr.length - 1;

  do {
    for (let j in names) {
      var _group$name;

      let name = names[j];
      card = (_group$name = group[name]) === null || _group$name === void 0 ? void 0 : _group$name.pop();

      if (card) {
        i = ++i % arr.length;
        arr[i].push(card);
      } else {
        delete group[name];
      }
    }
  } while (Object.keys(group).length);

  return arr.flat();
}

function distributeCards(cards, options) {
  let data = filterLands(cards);
  let arr = createGroupArray(4);
  let idx = 0;
  data.baseLands = distributeGroup(groupByName(data.baseLands));
  data.snowLands = distributeGroup(groupByName(data.snowLands));

  while (data.baseLands.length || data.snowLands.length || data.others.length) {
    for (let i = 0; i < 4; i++) {
      let card = data.others.pop();
      arr[i].push(card);

      if (!card || idx++ % 4 === 0) {
        var _data$baseLands$pop, _data$baseLands$pop2;

        arr[i].push((_data$baseLands$pop = data.baseLands.pop()) !== null && _data$baseLands$pop !== void 0 ? _data$baseLands$pop : data.snowLands.pop());
        arr[i].push((_data$baseLands$pop2 = data.baseLands.pop()) !== null && _data$baseLands$pop2 !== void 0 ? _data$baseLands$pop2 : data.snowLands.pop());
      }
    }
  }

  return arr.flat().filter(c => c);
}

class DeckLibraryWithShuffle extends mtgDecklistToLibrary.DeckLibrary {
  constructor(deck, options) {
    super(deck, options);
  }

  options(options) {
    return { ...this._options,
      ...options
    };
  }

  shuffleStarting() {
    let options = this.options();
    this.cards = [distributeCards, splitThenMerge].reduce((cards, fn) => fn(cards, options), this.cards);
    this._shuffleStarting = true;
  }

  shuffle(isStarting) {
    let random = getRandomFromOptions(this.options());

    random.arrayShuffle(this.cards, true);
  }

}

exports.DeckLibraryWithShuffle = DeckLibraryWithShuffle;
exports["default"] = DeckLibraryWithShuffle;
exports.distributeCards = distributeCards;
exports.splitThenMerge = splitThenMerge;
//# sourceMappingURL=index.cjs.development.js.map
