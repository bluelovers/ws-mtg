import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { createGroupArray } from './createGroupArray';

export function distributeGroup<T extends ICardWithoutAmount = ICardWithoutAmount>(group: Record<string, T[]>)
{
	let arr = createGroupArray<T>(4);

	const names = Object.keys(group);

	let card: T;
	let i = arr.length - 1;

	do
	{

		for (let name of names)
		{
			card = group[name]?.pop();

			if (card)
			{
				arr[i % arr.length].push(card);
			}
			else
			{
				delete group[name]
			}
		}

		if (card)
		{
			i++;
		}

	}
	while (Object.keys(group).length)

	return arr.flat()
}
