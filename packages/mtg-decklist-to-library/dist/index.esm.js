function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const STARTING_HAND_SIZE = 7;
function listToCardsArray(deckCards, options) {
  var _entryHandler;

  let {
    entryHandler
  } = options !== null && options !== void 0 ? options : {};
  (_entryHandler = entryHandler) !== null && _entryHandler !== void 0 ? _entryHandler : entryHandler = entry => entry;
  return deckCards.reduce((cards, entry) => {
    let {
      amount,
      ...card2
    } = entry;
    let card = entryHandler(card2);

    for (let i = 0; i < amount; i++) {
      cards.push(card);
    }

    return cards;
  }, []);
}
function deckListToCardsArray(deck, options) {
  return listToCardsArray(deck.deck, options);
}
class DeckLibrary {
  constructor(deck, options) {
    _defineProperty(this, "handSize", STARTING_HAND_SIZE);

    this.deck = deck;
    this.cards = deckListToCardsArray(deck, options);
  }

  get length() {
    return this.cards.length;
  }

  shuffleStarting() {
    this._shuffleStarting = true;
  }

  shuffle(isStarting) {
  }

  drawStarting(noPickup) {
    if (!this._shuffleStarting) {
      this.shuffleStarting();
    }

    this.shuffle(true);
    return this.draw(this.handSize, noPickup);
  }

  draw(size = 1, noPickup) {
    if (noPickup) {
      return this.cards.slice(0, size);
    }

    return this.cards.splice(0, size);
  }

}

export { DeckLibrary, deckListToCardsArray, deckListToCardsArray as default, listToCardsArray };
//# sourceMappingURL=index.esm.js.map
