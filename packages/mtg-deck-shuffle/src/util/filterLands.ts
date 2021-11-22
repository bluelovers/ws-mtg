import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { parseSnowCoveredOrBaseLand } from 'mtg-base-land';

export function filterLands<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[])
{
	return cards.reduce((data, card) =>
	{

		let info = parseSnowCoveredOrBaseLand(card.name);

		if (!info)
		{
			data.others.push(card);
		}
		else if (info?.snow)
		{
			data.snowLands.push(card);
		}
		else
		{
			data.baseLands.push(card);
		}

		return data
	}, {
		baseLands: [] as T[],
		snowLands: [] as T[],
		others: [] as T[],
	})
}
