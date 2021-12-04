import { ITSArrayListMaybeReadonly, ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';
import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumColor
{
	White = "W",
	Blue = "U",
	Black = "B",
	Red = "R",
	Green = "G"
}

export declare const enum EnumColorTitle
{
	W = "White",
	U = "Blue",
	B = "Black",
	R = "Red",
	G = "Green",

	Multi = 'Multi colored',
	Colorless = 'Colorless',
}

export const COLOR_PRIORITY = Object.freeze([
	EnumColor.White,
	EnumColor.Blue,
	EnumColor.Black,
	EnumColor.Red,
	EnumColor.Green,
] as const);

export function getColorTitle(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>)
{
	color_identity = [color_identity].flat() as EnumColor[];

	if (color_identity.length === 0)
	{
		return EnumColorTitle.Colorless
	}
	else if (color_identity.length === 1)
	{
		assertColorIdentity(color_identity[0]);

		// @ts-ignore
		return EnumColorTitle[color_identity[0]] as EnumColorTitle
	}

	return EnumColorTitle.Multi
}

export function isColorIdentity(color_identity: ITSAndTypeAndStringLiteral<EnumColor>): color_identity is EnumColor
{
	return COLOR_PRIORITY.includes(color_identity as EnumColor)
}

export function assertColorIdentity(color_identity: ITSAndTypeAndStringLiteral<EnumColor>): asserts color_identity is EnumColor
{
	if (!isColorIdentity(color_identity))
	{
		throw new TypeError(`Invalid Color Identity: ${color_identity}`)
	}
}

export function isColorIdentityArray(color_identity: ITSArrayListMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): color_identity is ITSArrayListMaybeReadonly<EnumColor>
{
	return color_identity.every(isColorIdentity)
}

export function assertColorIdentityArray(color_identity: ITSArrayListMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>): asserts color_identity is ITSArrayListMaybeReadonly<EnumColor>
{
	color_identity.forEach(assertColorIdentity)
}

export function isColorIdentityLazy(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>)
{
	return isColorIdentityArray([color_identity].flat())
}

export function assertColorIdentityLazy(color_identity: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<EnumColor>>)
{
	return assertColorIdentityArray([color_identity].flat())
}

export default isColorIdentityLazy
