import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { ITSAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumImgSource {
	gatherer = "gatherer",
	urzaCo = "urzaCo",
	scryfall = "scryfall",
	/**
	 * @deprecated
	 */
	magicCardsInfo = "magicCardsInfo"
}
export interface ICardForQueryInfo extends Partial<Omit<ICardWithoutAmount, "mtgoID">> {
	multiverseid?: string | number;
	mtgoID?: string | number;
}
export declare enum EnumScryfallImageFormat {
	small = "small",
	normal = "normal",
	large = "large",
	png = "png",
	art_crop = "art_crop",
	border_crop = "border_crop"
}
export interface IImageURLConfig {
	imgSource?: ITSAndStringLiteral<EnumImgSource>;
	language?: string;
	/**
	 * only for scryfall
	 */
	imageFormat?: ITSAndStringLiteral<EnumScryfallImageFormat>;
	imageFaceBack?: boolean;
}
export declare function getImageSourceURL(card: ICardForQueryInfo, config?: IImageURLConfig): URL;
export default getImageSourceURL;

export {};
