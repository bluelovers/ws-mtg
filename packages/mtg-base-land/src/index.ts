import { ITAndTypeAndStringLiteral, ITSToStringLiteral, ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

const _re = /^(Snow-Covered )?(.+)$/;

export const enum EnumBaseLand
{
	Plains = 'Plains',
	Island = 'Island',
	Swamp = 'Swamp',
	Mountain = 'Mountain',
	Forest = 'Forest',
}

export type ISnowBaseLandName<T extends EnumBaseLand = EnumBaseLand> = `Snow-Covered ${T}`;

const BASE_LAND_ARRAY = Object.freeze([
	EnumBaseLand.Plains as ITSTypeAndStringLiteral<EnumBaseLand.Plains>,
	EnumBaseLand.Island as ITSTypeAndStringLiteral<EnumBaseLand.Island>,
	EnumBaseLand.Swamp as ITSTypeAndStringLiteral<EnumBaseLand.Swamp>,
	EnumBaseLand.Mountain as ITSTypeAndStringLiteral<EnumBaseLand.Mountain>,
	EnumBaseLand.Forest as ITSTypeAndStringLiteral<EnumBaseLand.Forest>,
] as const);

const SNOW_BASE_LAND_ARRAY = Object.freeze(BASE_LAND_ARRAY.slice().map(toSnowBaseLand) as any as readonly [
	ISnowBaseLandName<EnumBaseLand.Plains>,
	ISnowBaseLandName<EnumBaseLand.Island>,
	ISnowBaseLandName<EnumBaseLand.Swamp>,
	ISnowBaseLandName<EnumBaseLand.Mountain>,
	ISnowBaseLandName<EnumBaseLand.Forest>,
]);

export { BASE_LAND_ARRAY, SNOW_BASE_LAND_ARRAY }

export function isBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand>): name is ITSTypeAndStringLiteral<EnumBaseLand>
{
	return BASE_LAND_ARRAY.includes(name as EnumBaseLand)
}

export interface IBaseLand<T extends EnumBaseLand>
{
	name: ITSToStringLiteral<T>;
	snow: false;
	type: T;
}

export interface ISnowBaseLand<T extends EnumBaseLand>
{
	name: ISnowBaseLandName<T>;
	snow: true;
	type: T;
}

export type ISnowCoveredOrBaseLand<T extends EnumBaseLand = EnumBaseLand> = IBaseLand<T> | ISnowBaseLand<T>;

export function parseSnowCoveredOrBaseLand<T extends EnumBaseLand>(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): ISnowCoveredOrBaseLand<T>
{
	const m = _re.exec(name);

	return isBaseLand(m?.[2]) && {
		name,
		snow: m[1]?.length > 0,
		type: m[2] as EnumBaseLand,
	} as ISnowCoveredOrBaseLand<T>
}

export function toSnowBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): ISnowBaseLandName
{
	const m = parseSnowCoveredOrBaseLand(name);

	if (m)
	{
		// @ts-ignore
		return m.snow ? m.name : `Snow-Covered ${m.type}`
	}
}

export function isSnowBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): name is ISnowBaseLandName
{
	const m = parseSnowCoveredOrBaseLand(name);

	return m?.snow
}

export function typeofBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): EnumBaseLand
{
	return parseSnowCoveredOrBaseLand(name)?.type;
}

export default parseSnowCoveredOrBaseLand;
