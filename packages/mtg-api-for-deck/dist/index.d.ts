import { AbstractDeck, CardModel, Decklist, SymDecklistType } from 'mtg-decklist-parser2';
import { Card } from 'scryfall-api';
import { Rarity } from 'scryfall-api/lib/types/Rarity';
import { ITSValueOrArray } from 'ts-type';

export declare type IScryfallCardType = [
	mainTypes: string[],
	subTypes?: string[]
];
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
export declare type IRarity = keyof typeof Rarity;
export declare type IScryfallCardInput = Card & {
	collector_number: number | string;
};
export declare const SymRaw: unique symbol;
export declare class ScryfallCardModel extends CardModel {
	[SymRaw]: Card;
	rarity: IRarity;
	mainTypes: string[];
	constructor(apiResult: IScryfallCardInput, amount?: number);
	protected _init(): void;
}
export declare class ScryfallDecklist<CARD extends ScryfallCardModel = ScryfallCardModel> extends AbstractDeck<CARD> {
	readonly [SymDecklistType]: "scryfall";
	constructor(apiResultList?: IScryfallCardInput[]);
	addByApiResult(apiResult: IScryfallCardInput, zone?: "deck" | "sideboard" | "companion" | "commander", amount?: number): CARD;
	protected _newCardModel(apiResult: IScryfallCardInput, amount?: number): CARD;
}
/**
 * @example
 * parseScryfallCardType('Land Creature — Forest Dryad')
 */
export declare function parseScryfallCardType(type_line_en: string): IScryfallCardType;
export declare function stringifyScryfallCardType(types: IScryfallCardType): string;
export declare function parseScryfallCardTypeExtra(type_line_en: string): IScryfallCardType[];
export declare function stringifyScryfallCardTypeExtra(types: IScryfallCardType[]): string;
export declare function getCardMainTypes(types: IScryfallCardType[]): string[];
export declare function groupScryfallDecklist(decklist: ScryfallDecklist): Record<EnumGroupCardType, ScryfallCardModel[]>;
export declare function stringifyScryfallDecklist(decklist: ScryfallDecklist): string;
export declare function groupScryfallCardList(list: ScryfallCardModel[]): Record<EnumGroupCardType, ScryfallCardModel[]>;
export declare function arrayifyGroupRecord(record: Record<EnumGroupCardType, ScryfallCardModel[]>): string[];
export declare function stringifyGroupRecord(record: Record<string, ScryfallCardModel[]>): string;
export declare function importByDecklist(decklist: Decklist, initScryfallDecklist?: ScryfallDecklist): Promise<ScryfallDecklist<ScryfallCardModel>>;
export declare function _queryCard(card: CardModel): Promise<import("scryfall-api").Card>;
export declare function cardTypeGroupByPriority<T extends string | EnumGroupCardType = EnumGroupCardType>(mainTypes: ITSValueOrArray<string>, priority?: T[]): T;
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
export default ScryfallDecklist;

export {};
