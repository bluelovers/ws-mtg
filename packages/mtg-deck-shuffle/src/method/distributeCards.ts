import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { IOptionsDeckLibraryWithShuffle } from '../types';
import { filterLands } from '../util/filterLands';
import { groupByName } from '../util/groupByName';
import { distributeGroup } from '../util/distributeGroup';
import { createGroupArray } from '../util/createGroupArray';
import { DeckLibraryWithShuffle } from '../library';

/**
 * do distribute before shuffle
 *
 * - distribute lands
 * - distribute cards and insert lands every 4 cards
 */
export function distributeCards<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[],
	options?: IOptionsDeckLibraryWithShuffle,
	self?: DeckLibraryWithShuffle,
): T[]
{
	let data = filterLands(cards);

	let arr = createGroupArray<T>(4);

	let idx = 0;

	data.baseLands = distributeGroup(groupByName(data.baseLands));
	data.snowLands = distributeGroup(groupByName(data.snowLands));

	while (data.baseLands.length || data.snowLands.length || data.others.length)
	{

		for (let i = 0; i < 4; i++)
		{
			let card = data.others.pop();
			arr[i].push(card);

			if (!card || (idx % 4) === 0)
			{
				arr[i].push(data.baseLands.pop() ?? data.snowLands.pop());
				arr[i].push(data.baseLands.pop() ?? data.snowLands.pop());
			}
		}

		idx++;

	}

	return arr.flat().filter(c => c)
}

export default distributeCards
