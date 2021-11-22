import { ICardWithoutAmount } from 'mtg-decklist-parser2';

export function groupByName<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[])
{
	return cards.reduce((map, card) =>
	{

		map[card.name] ??= [];
		map[card.name].push(card);

		return map
	}, {} as Record<string, T[]>);
}
