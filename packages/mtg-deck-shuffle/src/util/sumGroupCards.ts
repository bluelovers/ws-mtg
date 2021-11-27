import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { sumGroup } from 'array-group-to-record';

export function sumGroupCards<T = ICardWithoutAmount>(group: Record<string, T[]>)
{
	return sumGroup(group)
}
