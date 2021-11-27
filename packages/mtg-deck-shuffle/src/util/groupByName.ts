import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { arrayGroupToRecord } from 'array-group-to-record';

export function groupByName<T extends ICardWithoutAmount = ICardWithoutAmount>(cards: T[])
{
	return arrayGroupToRecord(cards, {
		getKey(item: T, index: number, arr: T[]): string {
			return item.name
		},
	})
}
