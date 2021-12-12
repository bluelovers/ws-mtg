import { IOptionsDeckLibraryWithShuffle } from '../types';
import { IRNGLike } from '@lazy-random/rng-abstract';
import { simpleWrap } from '@lazy-random/simple-wrap';
import { _MathRandom } from '@lazy-random/original-math-random';
import { dfArrayShuffle } from '@lazy-random/df-array';

let _cacheRNG: IRNGLike;

export function defaultRNG()
{
	return _cacheRNG ??= simpleWrap(_MathRandom)
}

export function getRandomFromOptions(options?: IOptionsDeckLibraryWithShuffle): IRNGLike
{
	const random = (options?.random ?? defaultRNG());

	return random as any
}

export function rngArrayShuffle<T>(random: IRNGLike, arr: T[], overwrite?: boolean)
{
	return dfArrayShuffle(random, arr, overwrite)();
}
