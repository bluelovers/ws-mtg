import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { splitChunk } from '../util/splitChunk';
import { getRandomFromOptions } from '../util/rand';
import { IOptionsDeckLibraryWithShuffle } from '../types';

export function splitThenMerge<T = ICardOfLibraryBase>(cards: T[], options?: IOptionsDeckLibraryWithShuffle): T[]
{
	let arr = splitChunk(cards, options?.maxChunkLength)

	return getRandomFromOptions(options).arrayShuffle(arr, true).flat()
}

export default splitThenMerge
