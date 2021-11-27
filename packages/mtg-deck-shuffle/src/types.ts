import { Random } from 'random-extra/src';
import { ICardOfLibrary, IOptionsDecklistToLibrary } from 'mtg-decklist-to-library';

export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T>
{
	maxChunkLength?: number,
	random?: Random,
	ensureLands?: number | boolean,
}
