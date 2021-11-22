import { Random } from 'random-extra/src';
import { ICardOfLibrary, IOptions as IOptionsDecklistToLibrary } from 'mtg-decklist-to-library';

export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T>
{
	maxChunkLength?: number,
	random?: Random,
	ensureLands?: number | boolean,
}
