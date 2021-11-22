import { ITAndTypeAndStringLiteral, ITSToStringLiteral, ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumBaseLand {
	Plains = "Plains",
	Island = "Island",
	Swamp = "Swamp",
	Mountain = "Mountain",
	Forest = "Forest"
}
export declare type ISnowBaseLandName<T extends EnumBaseLand = EnumBaseLand> = `Snow-Covered ${T}`;
export declare const BASE_LAND_ARRAY: readonly [
	ITSTypeAndStringLiteral<EnumBaseLand.Plains>,
	ITSTypeAndStringLiteral<EnumBaseLand.Island>,
	ITSTypeAndStringLiteral<EnumBaseLand.Swamp>,
	ITSTypeAndStringLiteral<EnumBaseLand.Mountain>,
	ITSTypeAndStringLiteral<EnumBaseLand.Forest>
];
export declare const SNOW_BASE_LAND_ARRAY: readonly [
	"Snow-Covered Plains",
	"Snow-Covered Island",
	"Snow-Covered Swamp",
	"Snow-Covered Mountain",
	"Snow-Covered Forest"
];
export declare function isBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand>): name is ITSTypeAndStringLiteral<EnumBaseLand>;
export interface IBaseLand<T extends EnumBaseLand> {
	name: ITSToStringLiteral<T>;
	snow: false;
	type: T;
}
export interface ISnowBaseLand<T extends EnumBaseLand> {
	name: ISnowBaseLandName<T>;
	snow: true;
	type: T;
}
export declare type ISnowCoveredOrBaseLand<T extends EnumBaseLand = EnumBaseLand> = IBaseLand<T> | ISnowBaseLand<T>;
export declare function parseSnowCoveredOrBaseLand<T extends EnumBaseLand>(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): ISnowCoveredOrBaseLand<T>;
export declare function toSnowBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): ISnowBaseLandName;
export declare function isSnowBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): name is ISnowBaseLandName;
export declare function typeofBaseLand(name: ITAndTypeAndStringLiteral<EnumBaseLand | ISnowBaseLandName>): EnumBaseLand;
export default parseSnowCoveredOrBaseLand;

export {};
