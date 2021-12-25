import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { ITSAndTypeAndStringLiteral, ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumLinkSource {
	gatherer = "gatherer",
	urzaCo = "urzaCo",
	scryfall = "scryfall",
	/**
	 * @deprecated
	 */
	magicCardsInfo = "magicCardsInfo",
	comboDeck = "comboDeck"
}
export interface ICardForQueryInfo extends Partial<Omit<ICardWithoutAmount, "mtgoID">> {
	multiverseid?: string | number;
	mtgoID?: string | number;
}
export declare const enum EnumScryfallLanguages {
	English = "en",
	Japanese = "ja",
	SimplifiedChinese = "zhs",
	TraditionalChinese = "zht",
	Phyrexian = "ph"
}
export interface ILinkURLConfig {
	linkSource?: ITSTypeAndStringLiteral<EnumLinkSource>;
	language?: ITSAndTypeAndStringLiteral<EnumScryfallLanguages>;
}
export declare function _handleName(name: string): string;
export declare function _toURL(linkUrl: URL | string): URL;
export declare function _padZero(num: string | number, size: number): string;
export declare function getLinkSourceURL(card: ICardForQueryInfo, config?: ILinkURLConfig): URL;
export default getLinkSourceURL;

export {};
