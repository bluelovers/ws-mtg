import { ICardOfLibrary, IOptionsDecklistToLibrary } from 'mtg-decklist-to-library';
import { IRNGLike } from '@lazy-random/rng-abstract';

export interface IOptionsDeckLibraryWithShuffle<T = ICardOfLibrary> extends IOptionsDecklistToLibrary<T>
{
	maxChunkLength?: number,
	random?: IRNGLike,
	ensureLands?: number | boolean,
}
