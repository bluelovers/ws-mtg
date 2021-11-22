import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { splitChunk } from '../util/splitChunk';
import { getRandomFromOptions } from '../util/rand';
import { IOptionsDeckLibraryWithShuffle } from '../types';
import { DeckLibraryWithShuffle } from '../library';

/**
 * split cards chunk and merge by random oder
 */
export function splitThenMerge<T = ICardWithoutAmount>(cards: T[],
	options?: IOptionsDeckLibraryWithShuffle,
	self?: DeckLibraryWithShuffle,
): T[]
{
	let arr = splitChunk(cards, options?.maxChunkLength)

	return getRandomFromOptions(options).arrayShuffle(arr, true).flat()
}

export default splitThenMerge
