import { ITSValueOrArray } from 'ts-type';
import { EnumGroupCardType } from '../types';
import { GROUP_CARD_TYPE_PRIORITY } from '../const';

export function cardTypeGroupByPriority<T extends string | EnumGroupCardType = EnumGroupCardType>(mainTypes: ITSValueOrArray<string>,
	priority?: T[],
): T
{
	mainTypes = [mainTypes].flat();

	let cardType: T;

	// @ts-ignore
	(priority ?? GROUP_CARD_TYPE_PRIORITY).find(type =>
	{
		if (mainTypes.includes(type))
		{
			cardType = type
			return true;
		}
	});

	return cardType
}
