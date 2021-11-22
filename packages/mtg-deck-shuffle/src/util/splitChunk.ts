import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { arrayChunkSplit } from 'array-chunk-split';

export function splitChunk<T = ICardWithoutAmount>(cards: T[], maxChunkLength?: number)
{
	return arrayChunkSplit(cards, maxChunkLength ?? 12)
}
