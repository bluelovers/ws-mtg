import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { IOptionsDeckLibraryWithShuffle } from '../types';
import { DeckLibraryWithShuffle } from '../library';
import { filterLands } from '../util/filterLands';
import { findIndexOfLands } from '../util/findIndexOfLands';
import { getRandomFromOptions } from '../util/rand';

/**
 * ensure always has lands when handSize >= 6
 */
export function ensureLands<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[],
	options: IOptionsDeckLibraryWithShuffle,
	self: DeckLibraryWithShuffle,
): T[]
{
	cards = cards.slice();

	let min: number;

	if (options?.ensureLands === false)
	{
		return cards
	}
	else if (options?.ensureLands === true)
	{
		min = 2;
	}
	else
	{
		min = Math.max(Math.min(2, (options?.ensureLands | 0) || 2), 0);
	}

	if (self.handSize < 6 || min <= 0)
	{
		return cards
	}
	else if (self.handSize === 6)
	{
		min = 1;
	}

	const hands = cards.slice(0, self.handSize);

	const data = filterLands(hands);

	const lands = data.snowLands.length + data.baseLands.length;

	const diff = lands - min;

	if (diff > 0)
	{

		const idxLandArray = findIndexOfLands(cards, self.handSize);

		const random = getRandomFromOptions(options);

		const fnLibraryLand = random.dfArrayUnique(idxLandArray, diff);

		let fnHandCard = random.dfArrayUnique(data.others, diff);

		for (let i = 0; i < diff; i++)
		{
			const card = fnHandCard();
			const idxLibraryLand = fnLibraryLand();

			const idxHand = hands.findIndex(value =>
			{
				return value.name === card.name
			});

			if (idxHand === -1)
			{
				throw new Error(`Something wrong`)
			}

			const c1 = cards[idxLibraryLand];
			const c2 = cards[idxHand];

			cards[idxLibraryLand] = c2;
			hands[idxHand] = cards[idxHand] = c1;
		}

	}

	return cards
}
