import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { parseSnowCoveredOrBaseLand } from 'mtg-base-land';

export function findIndexOfLands<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[], startIndex?: number)
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
