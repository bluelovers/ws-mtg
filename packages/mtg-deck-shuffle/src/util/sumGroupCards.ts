import { ICardOfLibraryBase } from 'mtg-decklist-to-library';

export function sumGroupCards<T = ICardOfLibraryBase>(group: Record<string, T[]>)
{
	return Object.values(group).reduce((a, b) => a + b.length, 0)
}
