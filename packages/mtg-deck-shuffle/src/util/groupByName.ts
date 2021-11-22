import { ICardOfLibraryBase } from 'mtg-decklist-to-library';

export function groupByName<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[])
{
	return cards.reduce((map, card) =>
	{

		map[card.name] ??= [];
		map[card.name].push(card);

		return map
	}, {} as Record<string, T[]>);
}
