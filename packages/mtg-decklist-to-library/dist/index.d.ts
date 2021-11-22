import { Decklist, ICard, ICardWithoutAmount } from 'mtg-decklist-parser2';

export declare type ICardOfLibrary<T = {}> = ICardWithoutAmount & T;
export interface IOptions<T = ICardOfLibrary> {
	entryHandler?(entry: ICardWithoutAmount): T;
}
export declare function listToCardsArray<T = ICardWithoutAmount>(deckCards: ICard[], options?: IOptions<T>): T[];
export declare function deckListToCardsArray<T = ICardWithoutAmount>(deck: Decklist, options?: IOptions<T>): T[];
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
	toList(): string[];
	toListString(sep?: string): string;
}
export declare function toList<T extends ICardWithoutAmount>(cards: T[]): string[];
export declare function toListString<T extends ICardWithoutAmount>(cards: T[], sep?: string): string;
export default deckListToCardsArray;

export {};
