import type { ICardWithoutAmount } from 'mtg-decklist-parser2';
import type { ITSAndTypeAndStringLiteral, ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import escapeStringRegexp from 'escape-string-regexp';

export const enum EnumLinkSource
{
	gatherer = 'gatherer',
	urzaCo = 'urzaCo',
	scryfall = 'scryfall',
	/**
	 * @deprecated
	 */
	magicCardsInfo = 'magicCardsInfo',

	comboDeck = 'comboDeck',
}

export interface ICardForQueryInfo extends Partial<Omit<ICardWithoutAmount, 'mtgoID' | 'multiverseid'>>
{
	multiverseid?: string | number,
	mtgoID?: string | number,
}

export const enum EnumScryfallLanguages
{
	English = 'en',
	Japanese = 'ja',
	SimplifiedChinese = 'zhs',
	TraditionalChinese = 'zht',
	Phyrexian = 'ph',
}

export interface ILinkURLConfig
{
	linkSource?: ITSTypeAndStringLiteral<EnumLinkSource>,
	language?: ITSAndTypeAndStringLiteral<EnumScryfallLanguages>,
}

export function _handleName(name: string)
{
	return name.split(/\s*\/\/\s*/)[0]
}

export function _toURL(linkUrl: URL | string)
{
	if (typeof linkUrl === 'string')
	{
		linkUrl = new URL(linkUrl);
	}

	return linkUrl
}

export function _padZero(num: string | number, size: number)
{
	return String(num).padStart(size, '0')
}

export function getLinkSourceURL(card: ICardForQueryInfo, config?: ILinkURLConfig)
{
	let linkUrl: URL | string;

	switch (config?.linkSource)
	{
		case EnumLinkSource.magicCardsInfo:
		case EnumLinkSource.scryfall:

			linkUrl = `https://scryfall.com/search?q=`;

			if (card.multiverseid)
			{
				linkUrl += `multiverseid=${card.multiverseid}`
			}
			else if (card.mtgoID)
			{
				linkUrl += `mtgoID=${card.mtgoID}`
			}
			else if (card.set && card.collectors)
			{
				linkUrl += `set:${card.set.toLowerCase()} number:${card.collectors}`
			}
			else if (!card.name?.length)
			{
				throw new TypeError(`Invalid name: ${card.name}`)
			}
			else
			{
				linkUrl += `name:/(?<=\\/\\/ |^)${escapeStringRegexp(card.name).replace(/\//g, '\\/')}(?= \\/\\/|$)/`
			}

			if (config?.language)
			{
				linkUrl += ` lang:${config.language}`
			}

			break
		case EnumLinkSource.urzaCo:

			if (!card.name?.length)
			{
				throw new TypeError(`Invalid name: ${card.name}`)
			}

			linkUrl = new URL(`https://urza.co/m/cards`);
			linkUrl.searchParams.set('q', card.name);

			break
		case EnumLinkSource.comboDeck:

			if (!card.name?.length)
			{
				throw new TypeError(`Invalid name: ${card.name}`)
			}

			linkUrl = new URL(`http://combodeck.net/Query/${encodeURIComponent(card.name)}`);

			break
		default:
			if (!card!.multiverseid)
			{
				if (card.name?.length)
				{
					linkUrl = new URL(`https://gatherer.wizards.com/Pages/Card/Details.aspx?type=card`)

					linkUrl.searchParams.set('name', _handleName(card.name));
				}
				else
				{
					throw new TypeError(`Invalid multiverseid: ${card!.multiverseid}`)
				}
			}
			else
			{
				linkUrl = `https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=${card.multiverseid}&type=card`
			}

			break
	}

	return _toURL(linkUrl)
}

export default getLinkSourceURL
