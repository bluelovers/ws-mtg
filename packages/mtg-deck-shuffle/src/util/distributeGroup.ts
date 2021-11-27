import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { distributeGroupToArray } from 'distribute-group-to-array';

export function distributeGroup<T extends ICardWithoutAmount = ICardWithoutAmount>(group: Record<string, T[]>)
{
	return distributeGroupToArray(group, {
		groupArraySize: 4,
	})
}
