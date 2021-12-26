'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mtgDecklistParser2 = require('mtg-decklist-parser2');
var arrayHyperUnique = require('array-hyper-unique');
var groupCardTypeByScryfallData = require('@lazy-mtg/group-card-type-by-scryfall-data');
var scryfallApi = require('scryfall-api');
var Bluebird = require('bluebird');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Bluebird__default = /*#__PURE__*/_interopDefaultLegacy(Bluebird);

function parseScryfallCardType(type_line_en) {
  let ls = type_line_en.trim().split(/—/).filter(v => v.length);

  if (!ls.length || ls.length > 2) {
    throw new SyntaxError(`Invalid card type: ${type_line_en}`);
  }

  return ls.map(t => t.trim().split(/\s+/).filter(v => v.length));
}
function stringifyScryfallCardType(types) {
  var _types$;

  const mainTypes = types[0].join(' ');
  let subTypes = (_types$ = types[1]) === null || _types$ === void 0 ? void 0 : _types$.filter(v => v.length);

  if (subTypes !== null && subTypes !== void 0 && subTypes.length) {
    return `${mainTypes} — ${subTypes.join(' ')}`;
  }

  return mainTypes;
}
function parseScryfallCardTypeExtra(type_line_en) {
  return type_line_en.split(/\s*\/\/\s*/).map(parseScryfallCardType);
}
function stringifyScryfallCardTypeExtra(types) {
  return types.map(stringifyScryfallCardType).join(' // ');
}
function getCardMainTypes(types) {
  let mainTypes = types.reduce((a, b) => {
    a.push(...b[0]);
    return a;
  }, []);
  return arrayHyperUnique.array_unique_overwrite(mainTypes);
}

const SymRaw = /*#__PURE__*/Symbol.for('raw-card');
class ScryfallCardModel extends mtgDecklistParser2.CardModel {
  constructor(apiResult, amount) {
    var _apiResult$mtgo_id;

    super({
      name: apiResult.name,
      set: apiResult.set.toUpperCase(),
      collectors: apiResult.collector_number
    });
    this.amount = amount;
    this[SymRaw] = apiResult;
    this.mtgoID = (_apiResult$mtgo_id = apiResult.mtgo_id) === null || _apiResult$mtgo_id === void 0 ? void 0 : _apiResult$mtgo_id.toString();

    this._init();
  }

  _init() {
    var _this$SymRaw$multiver, _this$SymRaw$multiver2;

    this.rarity = this[SymRaw].rarity;
    this.mainTypes = getCardMainTypes(parseScryfallCardTypeExtra(this[SymRaw].type_line));
    this.multiverseid = (_this$SymRaw$multiver = this[SymRaw].multiverse_ids) === null || _this$SymRaw$multiver === void 0 ? void 0 : (_this$SymRaw$multiver2 = _this$SymRaw$multiver[0]) === null || _this$SymRaw$multiver2 === void 0 ? void 0 : _this$SymRaw$multiver2.toString();
  }

}

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

class ScryfallDecklist extends mtgDecklistParser2.AbstractDeck {
  constructor(apiResultList) {
    super();

    _defineProperty(this, mtgDecklistParser2.SymDecklistType, 'scryfall');

    this.valid = false;

    if (apiResultList !== null && apiResultList !== void 0 && apiResultList.length) {
      apiResultList.forEach(apiResult => {
        this.addByApiResult(apiResult);
      });
      this.valid = true;
    }
  }

  addByApiResult(apiResult, zone, amount) {
    var _zone;

    (_zone = zone) !== null && _zone !== void 0 ? _zone : zone = 'deck';

    const card = this._newCardModel(apiResult, amount);

    if (zone === 'commander' || zone === 'companion') {
      this[zone] = card;
    } else {
      this[zone].push(card);
    }

    return card;
  }

  _newCardModel(apiResult, amount) {
    const card = new ScryfallCardModel(apiResult);
    card.amount = amount !== null && amount !== void 0 ? amount : card.amount;
    return card;
  }

}

function groupScryfallDecklist(decklist) {
  var _decklist$sideboard, _record$Land;

  const record = groupScryfallCardList(decklist.deck);

  if (decklist.commander) {
    record["Commander"].push(decklist.commander);
  }

  if (decklist.companion) {
    record["Companion"].push(decklist.companion);
  }

  if ((_decklist$sideboard = decklist.sideboard) !== null && _decklist$sideboard !== void 0 && _decklist$sideboard.length) {
    record["Sideboard"].push(...decklist.sideboard);
  }

  (_record$Land = record["Land"]) === null || _record$Land === void 0 ? void 0 : _record$Land.sort((a, b) => {
    let v1 = a.mainTypes.includes('Basic');
    let v2 = b.mainTypes.includes('Basic');

    if (v1 !== v2) {
      if (v1) {
        return -1;
      } else {
        return 1;
      }
    }

    return 0;
  });
  return record;
}
function stringifyScryfallDecklist(decklist) {
  const record = groupScryfallDecklist(decklist);
  return stringifyGroupRecord(record);
}
function groupScryfallCardList(list) {
  return list.reduce((record, card) => {
    var _record$group;

    let group = groupCardTypeByScryfallData.groupKeyByCardTypePriority(card.mainTypes);
    (_record$group = record[group]) !== null && _record$group !== void 0 ? _record$group : record[group] = [];
    record[group].push(card);
    return record;
  }, {});
}
function arrayifyGroupRecord(record) {
  const lines = [];
  groupCardTypeByScryfallData.GROUP_CARD_TYPE_DISPLAY_PRIORITY.forEach(group => {
    let list = record[group];

    if (list !== null && list !== void 0 && list.length) {
      lines.push(group);
      list.forEach(card => {
        let line = mtgDecklistParser2.toMtgifyCardString(card);
        lines.push(line);
      });
      lines.push('');
    }
  });
  return lines;
}
function stringifyGroupRecord(record) {
  return arrayifyGroupRecord(record).join('\n');
}

async function importByDecklist(decklist, initScryfallDecklist) {
  var _initScryfallDecklist;

  (_initScryfallDecklist = initScryfallDecklist) !== null && _initScryfallDecklist !== void 0 ? _initScryfallDecklist : initScryfallDecklist = new ScryfallDecklist();

  const _queryCardAndAdd = (card, zone, amount) => {
    return _queryCard(card).then(apiResult => {
      var _initScryfallDecklist2;

      return (_initScryfallDecklist2 = initScryfallDecklist) === null || _initScryfallDecklist2 === void 0 ? void 0 : _initScryfallDecklist2.addByApiResult(apiResult, 'deck', amount !== null && amount !== void 0 ? amount : card.amount);
    });
  };

  await Bluebird__default["default"].mapSeries(['deck', 'sideboard'], zone => {
    return Bluebird__default["default"].mapSeries(decklist[zone].slice(), card => card && _queryCardAndAdd(card, zone, card.amount));
  });
  await Bluebird__default["default"].mapSeries(['companion', 'commander'], zone => {
    const card = decklist[zone];
    return card && _queryCardAndAdd(card, zone, card.amount);
  });
  return initScryfallDecklist;
}
function _queryCard(card) {
  var _card$set;

  console.log(`start`, card.toCardString());
  return scryfallApi.Cards.byName(card.name, (_card$set = card.set) === null || _card$set === void 0 ? void 0 : _card$set.toLowerCase());
}

exports.ScryfallCardModel = ScryfallCardModel;
exports.ScryfallDecklist = ScryfallDecklist;
exports.SymRaw = SymRaw;
exports._queryCard = _queryCard;
exports.arrayifyGroupRecord = arrayifyGroupRecord;
exports["default"] = ScryfallDecklist;
exports.getCardMainTypes = getCardMainTypes;
exports.groupScryfallCardList = groupScryfallCardList;
exports.groupScryfallDecklist = groupScryfallDecklist;
exports.importByDecklist = importByDecklist;
exports.parseScryfallCardType = parseScryfallCardType;
exports.parseScryfallCardTypeExtra = parseScryfallCardTypeExtra;
exports.stringifyGroupRecord = stringifyGroupRecord;
exports.stringifyScryfallCardType = stringifyScryfallCardType;
exports.stringifyScryfallCardTypeExtra = stringifyScryfallCardTypeExtra;
exports.stringifyScryfallDecklist = stringifyScryfallDecklist;
//# sourceMappingURL=index.cjs.development.cjs.map
