import { IRNGLike } from '@lazy-random/rng-abstract';
import { Decklist, ICardWithoutAmount } from 'mtg-decklist-parser2';

export declare type ICardOfLibrary<T = {}> = ICardWithoutAmount & T;
export interface IOptionsDecklistToLibrary<T = ICardOfLibrary> {
	entryHandler?(entry: ICardWithoutAmount): T;
}
declare class DeckLibrary<T = {}> {
	readonly deck: Decklist;
	cards: T[];
	protected _shuffleStarting: boolean;
	handSize: number;
	constructor(deck: Decklist, options?: IOptionsDecklistToLibrary<ICardOfLibrary<T>>);
	get length(): number;
	shuffleStarting(): void;
	shuffle(isStarting?: boolean): void;
	drawStarting(noPickup?: boolean): T[];
	draw(size?: number, noPickup?: boolean): T[];
	toList(): string[];
	toListString(sep?: string): string;
}
export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T> {
	maxChunkLength?: number;
	random?: IRNGLike;
	ensureLands?: number | boolean;
}
export declare class DeckLibraryWithShuffle<T = {}> extends DeckLibrary<ICardOfLibrary<T>> {
	_options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>;
	constructor(deck: Decklist, options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>);
	options(options?: IOptionsDeckLibraryWithShuffle): IOptionsDeckLibraryWithShuffle;
	shuffleStarting(): void;
	shuffle(isStarting?: boolean): void;
}
/**
 * do distribute before shuffle
 *
 * - distribute lands
 * - distribute cards and insert lands every 4 cards
 */
export declare function distributeCards<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[], options?: IOptionsDeckLibraryWithShuffle, self?: DeckLibraryWithShuffle): T[];
/**
 * split cards chunk and merge by random oder
 */
export declare function splitThenMerge<T = ICardWithoutAmount>(cards: T[], options?: IOptionsDeckLibraryWithShuffle, self?: DeckLibraryWithShuffle): T[];
/**
 * ensure always has lands when handSize >= 6
 */
export declare function ensureLands<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[], options: IOptionsDeckLibraryWithShuffle, self: DeckLibraryWithShuffle): T[];
export default DeckLibraryWithShuffle;

export {};
