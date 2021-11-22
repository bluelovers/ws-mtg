import { Random } from 'random-extra/src';
import { ICardOfLibrary } from 'mtg-decklist-to-library';
import { IOptions as IOptionsDecklistToLibrary } from 'mtg-decklist-to-library';

export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T>
{
	maxChunkLength?: number,
	random?: Random
}
