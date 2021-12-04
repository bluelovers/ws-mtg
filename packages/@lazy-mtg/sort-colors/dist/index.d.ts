import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumColor {
	White = "W",
	Blue = "U",
	Black = "B",
	Red = "R",
	Green = "G"
}
export declare const COLOR_PRIORITY: readonly [
	EnumColor.White,
	EnumColor.Blue,
	EnumColor.Black,
	EnumColor.Red,
	EnumColor.Green
];
/**
 * @see https://markrosewater.tumblr.com/post/13840097441/whats-the-proper-number-order-for-multicoloured
 */
export declare function compareWUBRG(a: ITSAndTypeAndStringLiteral<EnumColor>, b: ITSAndTypeAndStringLiteral<EnumColor>): 0 | 1 | -1;
export default compareWUBRG;

export {};
