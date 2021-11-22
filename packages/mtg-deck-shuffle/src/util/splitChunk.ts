import { ICardOfLibraryBase } from 'mtg-decklist-to-library';
import { arrayChunkSplit } from 'array-chunk-split';

export function splitChunk<T = ICardOfLibraryBase>(cards: T[], maxChunkLength?: number)
{
	return arrayChunkSplit(cards, maxChunkLength ?? 12)
}
