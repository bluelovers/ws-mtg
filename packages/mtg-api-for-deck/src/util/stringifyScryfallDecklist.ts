import { ScryfallDecklist } from '../deck/scryfall';
import { ScryfallCardModel } from '../card/scryfall';
import { cardTypeGroupByPriority } from './cardTypeGroupByPriority';
import { GROUP_CARD_TYPE_DISPLAY_PRIORITY } from '../const';
import { EnumGroupCardType } from '../types';
// @ts-ignore
import { toCardStringWithoutAmount } from 'mtg-decklist-parser2';

export function groupScryfallDecklist(decklist: ScryfallDecklist)
{
	const record = groupScryfallCardList(decklist.deck);

	if (decklist.commander)
	{
		record[EnumGroupCardType.Commander].push(decklist.commander)
	}

	if (decklist.companion)
	{
		record[EnumGroupCardType.Companion].push(decklist.companion)
	}

	if (decklist.sideboard?.length)
	{
		record[EnumGroupCardType.Sideboard].push(...decklist.sideboard)
	}

	record[EnumGroupCardType.Land]?.sort((a, b) => {

		let v1 = a.mainTypes.includes('Basic');
		let v2 = b.mainTypes.includes('Basic');

		if (v1 !== v2)
		{
			if (v1)
			{
				return -1
			}
			else
			{
				return 1
			}
		}

		return 0
	})

	return record;
}

export function stringifyScryfallDecklist(decklist: ScryfallDecklist)
{
	const record = groupScryfallDecklist(decklist);

	return stringifyGroupRecord(record);
}

export function groupScryfallCardList(list: ScryfallCardModel[])
{
	return list.reduce((record, card) =>
	{

		let group = cardTypeGroupByPriority(card.mainTypes);

		record[group] ??= [];
		record[group].push(card);

		return record;
	}, {} as Record<EnumGroupCardType, ScryfallCardModel[]>)
}

export function arrayifyGroupRecord(record: Record<EnumGroupCardType, ScryfallCardModel[]>)
{
	const lines: string[] = []

	GROUP_CARD_TYPE_DISPLAY_PRIORITY
		.forEach(group =>
		{

			let list = record[group];

			if (list?.length)
			{
				lines.push(group)

				list.forEach(card =>
				{
					let line = `${card.amount ?? 1}x ${card.name}`

					lines.push(line)
				})

				lines.push('')
			}

		})
	;

	return lines
}

export function stringifyGroupRecord(record: Record<string, ScryfallCardModel[]>)
{
	return arrayifyGroupRecord(record).join('\n')
}
