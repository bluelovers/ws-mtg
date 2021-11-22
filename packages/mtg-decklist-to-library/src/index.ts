import { Decklist, ICard, ICardWithoutAmount, toCardStringWithoutAmount } from 'mtg-decklist-parser2';

export type { ICardWithoutAmount }

export type ICardOfLibrary<T = {}> = ICardWithoutAmount & T

const STARTING_HAND_SIZE = 7 as const

export interface IOptions<T = ICardOfLibrary>
{
	entryHandler?(entry: ICardWithoutAmount): T
}

export function listToCardsArray<T = ICardWithoutAmount>(deckCards: ICard[], options?: IOptions<T>): T[]
{
	let { entryHandler } = (options ?? {});

	entryHandler ??= (entry) => entry as any;

	return deckCards.reduce((cards, entry) =>
	{

		let {
			amount,
			...card2
		} = entry;

		let card = entryHandler(card2);

		for (let i = 0; i < amount; i++)
		{
			cards.push(card as any as T);
		}

		return cards
	}, [] as T[])
}

export function deckListToCardsArray<T = ICardWithoutAmount>(deck: Decklist, options?: IOptions<T>)
{
	return listToCardsArray<T>(deck.deck, options)
}

export class DeckLibrary<T = {}>
{

	public cards: T[];
	protected _shuffleStarting: boolean;

	public handSize: number = STARTING_HAND_SIZE;

	constructor(public readonly deck: Decklist, options?: IOptions<ICardOfLibrary<T>>)
	{
		this.cards = deckListToCardsArray(deck, options);
	}

	get length()
	{
		return this.cards.length;
	}

	shuffleStarting()
	{
		this._shuffleStarting = true;
	}

	shuffle(isStarting?: boolean)
	{
		if (isStarting)
		{

		}
	}

	drawStarting(noPickup?: boolean)
	{
		if (!this._shuffleStarting)
		{
			this.shuffleStarting();
		}

		this.shuffle(true);

		return this.draw(this.handSize, noPickup);
	}

	draw(size: number = 1, noPickup?: boolean)
	{
		if (noPickup)
		{
			return this.cards.slice(0, size)
		}

		return this.cards.splice(0, size)
	}

	toList()
	{
		return toList(this.cards as any)
	}

	toListString(sep = '\n')
	{
		return toListString(this.cards as any, sep)
	}

}

export function toList<T extends ICardWithoutAmount>(cards: T[])
{
	const len = Math.max(3, cards.length.toString().length);

	return cards.reduce((arr, card, index) => {

		arr.push(`${String(index).padStart(len, '0')} ${toCardStringWithoutAmount(card)}`)

		return arr
	}, [] as string[])
}

export function toListString<T extends ICardWithoutAmount>(cards: T[], sep = '\n')
{
	return toList(cards).join(sep)
}

export default deckListToCardsArray
