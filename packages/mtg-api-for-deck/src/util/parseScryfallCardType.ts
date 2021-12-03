// @ts-ignore
import { Card } from 'scryfall-api';
import { IScryfallCardType } from '../types';
import { array_unique_overwrite } from 'array-hyper-unique';

/**
 * @example
 * parseScryfallCardType('Land Creature — Forest Dryad')
 */
export function parseScryfallCardType(type_line_en: string): IScryfallCardType
{
	let ls = type_line_en.trim().split(/—/).filter(v => v.length);

	if (!ls.length || ls.length > 2)
	{
		throw new SyntaxError(`Invalid card type: ${type_line_en}`)
	}

	return ls.map(t => t.trim().split(/\s+/).filter(v => v.length)) as any
}

export function stringifyScryfallCardType(types: IScryfallCardType)
{
	const mainTypes = types[0].join(' ');
	let subTypes = types[1]?.filter(v => v.length);

	if (subTypes?.length)
	{
		return `${mainTypes} — ${subTypes.join(' ')}`
	}

	return mainTypes
}

export function parseScryfallCardTypeExtra(type_line_en: string)
{
	return type_line_en.split(/\s*\/\/\s*/)
		.map(parseScryfallCardType)
}

export function stringifyScryfallCardTypeExtra(types: IScryfallCardType[])
{
	return types
		.map(stringifyScryfallCardType)
		.join(' // ')
}

export function getCardMainTypes(types: IScryfallCardType[])
{
	let mainTypes = types.reduce((a, b) => {
		a.push(...b[0]);

		return a
	}, [] as string[]);

	return array_unique_overwrite(mainTypes)
}
