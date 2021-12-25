import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { ITSArrayListMaybeReadonly, ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

export declare const enum EnumGroupCardType {
	Sorcery = "Sorcery",
	Instant = "Instant",
	Planeswalker = "Planeswalker",
	Enchantment = "Enchantment",
	Artifact = "Artifact",
	Creature = "Creature",
	Land = "Land",
	Commander = "Commander",
	Uncategorized = "Uncategorized",
	Sideboard = "Sideboard",
	Companion = "Companion"
}
export declare const GROUP_CARD_TYPE_PRIORITY: readonly [
	EnumGroupCardType.Sorcery,
	EnumGroupCardType.Instant,
	EnumGroupCardType.Planeswalker,
	EnumGroupCardType.Enchantment,
	EnumGroupCardType.Artifact,
	EnumGroupCardType.Creature,
	EnumGroupCardType.Land
];
export declare const GROUP_CARD_TYPE_DISPLAY_PRIORITY: readonly [
	EnumGroupCardType.Commander,
	EnumGroupCardType.Companion,
	EnumGroupCardType.Creature,
	EnumGroupCardType.Planeswalker,
	EnumGroupCardType.Artifact,
	EnumGroupCardType.Enchantment,
	EnumGroupCardType.Instant,
	EnumGroupCardType.Sorcery,
	EnumGroupCardType.Land,
	EnumGroupCardType.Sideboard,
	EnumGroupCardType.Uncategorized
];
export declare const groupKeyByCardTypePriority: (arrayValue: import("ts-type/lib/type/base").ITSValueOrArrayMaybeReadonly<string>) => EnumGroupCardType.Sorcery | EnumGroupCardType.Instant | EnumGroupCardType.Planeswalker | EnumGroupCardType.Enchantment | EnumGroupCardType.Artifact | EnumGroupCardType.Creature | EnumGroupCardType.Land;
export declare function dfGroupArrayFieldByPriority<T extends string>(priority: ITSArrayListMaybeReadonly<T>, defaultValue?: ITSAndTypeAndStringLiteral<T>): (arrayValue: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<T>>) => T;
export declare function dfGroupFieldByPriority<T extends string>(priority: ITSArrayListMaybeReadonly<T>, defaultValue?: ITSAndTypeAndStringLiteral<T>): (inputValue: ITSAndTypeAndStringLiteral<T>) => T;

export {};
