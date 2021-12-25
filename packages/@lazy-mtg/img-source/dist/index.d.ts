import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { ITSAndStringLiteral, ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';

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
	linkSource?: ITSAndStringLiteral<EnumLinkSource>;
	language?: ITSAndTypeAndStringLiteral<EnumScryfallLanguages>;
}
export declare const enum EnumImgSource {
	gatherer = "gatherer",
	urzaCo = "urzaCo",
	scryfall = "scryfall",
	/**
	 * @deprecated
	 */
	magicCardsInfo = "magicCardsInfo"
}
export declare enum EnumScryfallImageFormat {
	small = "small",
	normal = "normal",
	large = "large",
	png = "png",
	art_crop = "art_crop",
	border_crop = "border_crop"
}
export interface IImageURLConfig extends ILinkURLConfig {
	imgSource?: ITSAndStringLiteral<EnumImgSource>;
	/**
	 * only for scryfall
	 */
	imageFormat?: ITSAndStringLiteral<EnumScryfallImageFormat>;
	imageFaceBack?: boolean;
}
export declare function getImageSourceURL(card: ICardForQueryInfo, config?: IImageURLConfig): URL;
export default getImageSourceURL;

export {};
