import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { IOptionsDeckLibraryWithShuffle } from '../types';
import { filterLands } from '../util/filterLands';
import { groupByName } from '../util/groupByName';
import { distributeGroup } from '../util/distributeGroup';
import { createGroupArray } from '../util/createGroupArray';

export function distributeCards<T extends ICardOfLibraryBase = ICardOfLibraryBase>(cards: T[],
	// @ts-ignore
	options?: IOptionsDeckLibraryWithShuffle
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

			if (!card || (idx++ % 4) === 0)
			{
				arr[i].push(data.baseLands.pop() ?? data.snowLands.pop())
				arr[i].push(data.baseLands.pop() ?? data.snowLands.pop())
			}
		}

	}

	return arr.flat().filter(c => c)
}

export default distributeCards
