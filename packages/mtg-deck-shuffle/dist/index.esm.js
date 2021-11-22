import { DeckLibrary } from 'mtg-decklist-to-library';
import { seedrandom } from 'random-extra/preset/seedrandom';
import { arrayChunkSplit } from 'array-chunk-split';
import { parseSnowCoveredOrBaseLand } from 'mtg-base-land';

function getRandomFromOptions(options) {
  var _options$random;

  const random = (_options$random = options === null || options === void 0 ? void 0 : options.random) !== null && _options$random !== void 0 ? _options$random : seedrandom;
  return random;
}

function splitChunk(cards, maxChunkLength) {
  return arrayChunkSplit(cards, maxChunkLength !== null && maxChunkLength !== void 0 ? maxChunkLength : 12);
}

function splitThenMerge(cards, options, self) {
  let arr = splitChunk(cards, options === null || options === void 0 ? void 0 : options.maxChunkLength);
  return getRandomFromOptions(options).arrayShuffle(arr, true).flat();
}

function filterLands(cards) {
  return cards.reduce((data, card) => {
    let info = parseSnowCoveredOrBaseLand(card.name);

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
    for (let name of names) {
      var _group$name;

      card = (_group$name = group[name]) === null || _group$name === void 0 ? void 0 : _group$name.pop();

      if (card) {
        arr[i % arr.length].push(card);
      } else {
        delete group[name];
      }
    }

    if (card) {
      i++;
    }
  } while (Object.keys(group).length);

  return arr.flat();
}

function distributeCards(cards, options, self) {
  let data = filterLands(cards);
  let arr = createGroupArray(4);
  let idx = 0;
  data.baseLands = distributeGroup(groupByName(data.baseLands));
  data.snowLands = distributeGroup(groupByName(data.snowLands));

  while (data.baseLands.length || data.snowLands.length || data.others.length) {
    for (let i = 0; i < 4; i++) {
      let card = data.others.pop();
      arr[i].push(card);

      if (!card || idx % 4 === 0) {
        var _data$baseLands$pop, _data$baseLands$pop2;

        arr[i].push((_data$baseLands$pop = data.baseLands.pop()) !== null && _data$baseLands$pop !== void 0 ? _data$baseLands$pop : data.snowLands.pop());
        arr[i].push((_data$baseLands$pop2 = data.baseLands.pop()) !== null && _data$baseLands$pop2 !== void 0 ? _data$baseLands$pop2 : data.snowLands.pop());
      }
    }

    idx++;
  }

  return arr.flat().filter(c => c);
}

function findIndexOfLands(cards, startIndex) {
  startIndex |= 0;
  return cards.reduce((list, card, idx) => {
    if (idx >= startIndex) {
      let info = parseSnowCoveredOrBaseLand(card.name);

      if (info) {
        list.push(idx);
      }
    }

    return list;
  }, []);
}

function ensureLands(cards, options, self) {
  cards = cards.slice();
  let min;

  if ((options === null || options === void 0 ? void 0 : options.ensureLands) === false) {
    return cards;
  } else if ((options === null || options === void 0 ? void 0 : options.ensureLands) === true) {
    min = 2;
  } else {
    min = Math.max(Math.min(2, (options === null || options === void 0 ? void 0 : options.ensureLands) | 0 || 2), 0);
  }

  if (self.handSize < 6 || min <= 0) {
    return cards;
  } else if (self.handSize === 6) {
    min = 1;
  }

  const hands = cards.slice(0, self.handSize);
  const data = filterLands(hands);
  const lands = data.snowLands.length + data.baseLands.length;
  const diff = lands - min;

  if (diff > 0) {
    const idxLandArray = findIndexOfLands(cards, self.handSize);
    const random = getRandomFromOptions(options);
    const fnLibraryLand = random.dfArrayUnique(idxLandArray, diff);
    let fnHandCard = random.dfArrayUnique(data.others, diff);

    for (let i = 0; i < diff; i++) {
      const card = fnHandCard();
      const idxLibraryLand = fnLibraryLand();
      const idxHand = hands.findIndex(value => {
        return value.name === card.name;
      });

      if (idxHand === -1) {
        throw new Error(`Something wrong`);
      }

      const c1 = cards[idxLibraryLand];
      const c2 = cards[idxHand];
      cards[idxLibraryLand] = c2;
      hands[idxHand] = cards[idxHand] = c1;
    }
  }

  return cards;
}

class DeckLibraryWithShuffle extends DeckLibrary {
  constructor(deck, options) {
    super(deck, options);
  }

  options(options) {
    return { ...this._options,
      ...options
    };
  }

  shuffleStarting() {
    var _options$ensureLands;

    let options = this.options();
    const random = getRandomFromOptions(options);
    (_options$ensureLands = options.ensureLands) !== null && _options$ensureLands !== void 0 ? _options$ensureLands : options.ensureLands = random.int(0, 2);
    let cards = [distributeCards, splitThenMerge, ensureLands].reduce((cards, fn) => fn(cards, options, this), this.cards);
    this.cards = cards;
    this._shuffleStarting = true;
  }

  shuffle(isStarting) {
    let random = getRandomFromOptions(this.options());

    random.arrayShuffle(this.cards, true);
  }

}

export { DeckLibraryWithShuffle, DeckLibraryWithShuffle as default, distributeCards, ensureLands, splitThenMerge };
//# sourceMappingURL=index.esm.js.map
