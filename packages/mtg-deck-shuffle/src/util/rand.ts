import { seedrandom } from 'random-extra/preset/seedrandom';
import { IOptionsDeckLibraryWithShuffle } from '../types';
import { Random } from 'random-extra/src';

export function getRandomFromOptions(options?: IOptionsDeckLibraryWithShuffle): Random
{
	const random = (options?.random ?? seedrandom);

	return random as any
}
