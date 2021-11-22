import { Decklist, ICard } from 'mtg-decklist-parser2';

export interface ICardOfLibraryBase extends Omit<ICard, "amount"> {
}
export declare type ICardOfLibrary<T = {}> = ICardOfLibraryBase & T;
export interface IOptions<T = ICardOfLibrary> {
	entryHandler?(entry: ICardOfLibraryBase): T;
}
export declare function listToCardsArray<T = ICardOfLibraryBase>(deckCards: ICard[], options?: IOptions<T>): T[];
export declare function deckListToCardsArray<T = ICardOfLibraryBase>(deck: Decklist, options?: IOptions<T>): T[];
export declare class DeckLibrary<T = {}> {
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
export default deckListToCardsArray;

export {};
