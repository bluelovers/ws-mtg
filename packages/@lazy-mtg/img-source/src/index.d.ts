import type { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { ICardForQueryInfo, ILinkURLConfig } from '@lazy-mtg/link-source';
export declare const enum EnumImgSource {
    gatherer = "gatherer",
    urzaCo = "urzaCo",
    scryfall = "scryfall",
    /**
     * @deprecated
     */
    magicCardsInfo = "magicCardsInfo"
}
export declare const enum EnumScryfallImageFormat {
    small = "small",
    normal = "normal",
    large = "large",
    png = "png",
    art_crop = "art_crop",
    border_crop = "border_crop"
}
export interface IImageURLConfig extends ILinkURLConfig {
    imgSource?: ITSTypeAndStringLiteral<EnumImgSource>;
    /**
     * only for scryfall
     */
    imageFormat?: ITSTypeAndStringLiteral<EnumScryfallImageFormat>;
    imageFaceBack?: boolean;
}
export declare function getImageSourceURL(card: ICardForQueryInfo, config?: IImageURLConfig): URL;
export default getImageSourceURL;
