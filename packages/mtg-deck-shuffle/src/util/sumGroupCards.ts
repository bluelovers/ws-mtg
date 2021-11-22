import { ICardWithoutAmount } from 'mtg-decklist-parser2';

export function sumGroupCards<T = ICardWithoutAmount>(group: Record<string, T[]>)
{
	return Object.values(group).reduce((a, b) => a + b.length, 0)
}
