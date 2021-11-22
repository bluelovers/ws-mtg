import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { parseSnowCoveredOrBaseLand } from 'mtg-base-land';

export function findIndexOfLands<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[], startIndex?: number)
{
	startIndex |= 0;

	return cards.reduce((list, card, idx) => {

		if (idx >= startIndex)
		{
			let info = parseSnowCoveredOrBaseLand(card.name);

		if (info)
		{
			list.push(idx);
		}
		}

		return list
	}, [] as number[])
}
