import { Decklist, ICard } from 'mtg-decklist-parser2';
import { Random } from 'random-extra/src';

export interface ICardOfLibraryBase extends Omit<ICard, "amount"> {
}
export declare type ICardOfLibrary<T = {}> = ICardOfLibraryBase & T;
export interface IOptions<T = ICardOfLibrary> {
	entryHandler?(entry: ICardOfLibraryBase): T;
}
declare class DeckLibrary<T = {}> {
	readonly deck: Decklist;
	cards: T[];
	protected _shuffleStarting: boolean;
	handSize: number;
	constructor(deck: Decklist, options?: IOptions<ICardOfLibrary<T>>);
	get length(): number;
	shuffleStarting(): void;
	shuffle(isStarting?: boolean): void;
	drawStarting(noPickup?: boolean): T[];
	draw(size?: number, noPickup?: boolean): T[];
}
export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T> {
	maxChunkLength?: number;
	random?: Random;
}
export declare class DeckLibraryWithShuffle<T = {}> extends DeckLibrary<ICardOfLibrary<T>> {
	_options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>;
	constructor(deck: Decklist, options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>);
	options(options?: IOptionsDeckLibraryWithShuffle): IOptionsDeckLibraryWithShuffle;
	shuffleStarting(): void;
	shuffle(isStarting?: boolean): void;
}
export declare function distributeCards<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[], options?: IOptionsDeckLibraryWithShuffle): T[];
export declare function splitThenMerge<T = ICardOfLibraryBase>(cards: T[], options?: IOptionsDeckLibraryWithShuffle): T[];
export default DeckLibraryWithShuffle;

export {};
