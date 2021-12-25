const GROUP_CARD_TYPE_PRIORITY = ["Sorcery", "Instant", "Planeswalker", "Enchantment", "Artifact", "Creature", "Land"];
const GROUP_CARD_TYPE_DISPLAY_PRIORITY = ["Commander", "Companion", "Creature", "Planeswalker", "Artifact", "Enchantment", "Instant", "Sorcery", "Land", "Sideboard", "Uncategorized"];

var EnumGroupCardType;

(function (EnumGroupCardType) {
  EnumGroupCardType["Sorcery"] = "Sorcery";
  EnumGroupCardType["Instant"] = "Instant";
  EnumGroupCardType["Planeswalker"] = "Planeswalker";
  EnumGroupCardType["Enchantment"] = "Enchantment";
  EnumGroupCardType["Artifact"] = "Artifact";
  EnumGroupCardType["Creature"] = "Creature";
  EnumGroupCardType["Land"] = "Land";
  EnumGroupCardType["Commander"] = "Commander";
  EnumGroupCardType["Uncategorized"] = "Uncategorized";
  EnumGroupCardType["Sideboard"] = "Sideboard";
  EnumGroupCardType["Companion"] = "Companion";
})(EnumGroupCardType || (EnumGroupCardType = {}));

var EnumRarity;

(function (EnumRarity) {
  EnumRarity["Common"] = "common";
  EnumRarity["Uncommon"] = "uncommon";
  EnumRarity["Rare"] = "rare";
  EnumRarity["Mythic"] = "mythic";
})(EnumRarity || (EnumRarity = {}));

function dfGroupArrayFieldByPriority(priority, defaultValue) {
  return arrayValue => {
    let returnValue = defaultValue;
    arrayValue = [arrayValue].flat();
    priority.find(type => {
      if (arrayValue.includes(type)) {
        returnValue = type;
        return true;
      }
    });
    return returnValue;
  };
}
function dfGroupFieldByPriority(priority, defaultValue) {
  return inputValue => {
    let returnValue = defaultValue;
    priority.find(type => {
      if (inputValue === type) {
        returnValue = type;
        return true;
      }
    });
    return returnValue;
  };
}

const groupKeyByCardTypePriority = /*#__PURE__*/dfGroupArrayFieldByPriority(GROUP_CARD_TYPE_PRIORITY);

export { EnumGroupCardType, GROUP_CARD_TYPE_DISPLAY_PRIORITY, GROUP_CARD_TYPE_PRIORITY, dfGroupArrayFieldByPriority, dfGroupFieldByPriority, groupKeyByCardTypePriority };
//# sourceMappingURL=index.esm.mjs.map
