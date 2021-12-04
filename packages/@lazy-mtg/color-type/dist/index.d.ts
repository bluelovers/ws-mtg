import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { ITSArrayListMaybeReadonly, ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

export declare const enum EnumColor {
	White = "W",
	Blue = "U",
	Black = "B",
	Red = "R",
	Green = "G"
}
export declare const enum EnumColorTitle {
	W = "White",
	U = "Blue",
	B = "Black",
	R = "Red",
	G = "Green",
	Multi = "Multi colored",
	Colorless = "Colorless"
}
export declare const COLOR_PRIORITY: readonly [
	EnumColor.White,
	EnumColor.Blue,
	EnumColor.Black,
	EnumColor.Red,
	EnumColor.Green
];
export declare function getColorTitle(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): EnumColorTitle;
export declare function isColorIdentity(color_identity: ITSAndTypeAndStringLiteral<EnumColor>): color_identity is EnumColor;
export declare function assertColorIdentity(color_identity: ITSAndTypeAndStringLiteral<EnumColor>): asserts color_identity is EnumColor;
export declare function isColorIdentityArray(color_identity: ITSArrayListMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): color_identity is ITSArrayListMaybeReadonly<EnumColor>;
export declare function assertColorIdentityArray(color_identity: ITSArrayListMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): asserts color_identity is ITSArrayListMaybeReadonly<EnumColor>;
export declare function isColorIdentityLazy(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): boolean;
export declare function assertColorIdentityLazy(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): void;
export default isColorIdentityLazy;

export {};
