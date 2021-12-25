import type { ITSAndStringLiteral } from 'ts-type/lib/helper/string';
import {
	_handleName,
	_padZero,
	_toURL,
	ICardForQueryInfo,
	ILinkURLConfig,
	EnumScryfallLanguages,
} from '@lazy-mtg/link-source';

export const enum EnumImgSource
{
	gatherer = 'gatherer',
	urzaCo = 'urzaCo',
	scryfall = 'scryfall',
	/**
	 * @deprecated
	 */
	magicCardsInfo = 'magicCardsInfo',
}

export enum EnumScryfallImageFormat
{
	small = 'small',
	normal = 'normal',
	large = 'large',
	png = 'png',
	art_crop = 'art_crop',
	border_crop = 'border_crop',
}

export interface IImageURLConfig extends ILinkURLConfig
{
	imgSource?: ITSAndStringLiteral<EnumImgSource>,

	/**
	 * only for scryfall
	 */
	imageFormat?: ITSAndStringLiteral<EnumScryfallImageFormat>,
	imageFaceBack?: boolean,
}

export function getImageSourceURL(card: ICardForQueryInfo, config?: IImageURLConfig)
{
	let linkUrl: URL | string;

	const cardNum = card.collectors;

	switch (config?.imgSource ?? config?.linkSource)
	{
		case EnumImgSource.magicCardsInfo:
		case EnumImgSource.scryfall:

			if (!cardNum)
			{
				if (card.multiverseid)
				{
					linkUrl = `https://api.scryfall.com/cards/multiverse/${card.multiverseid}?format=image`
				}
				else if (card.mtgoID)
				{
					linkUrl = new URL(`https://api.scryfall.com/cards/mtgo/${card.mtgoID}`);
				}
				else if (card.name?.length > 0)
				{
					linkUrl = new URL(`https://api.scryfall.com/cards/named`);

					linkUrl.searchParams.set('fuzzy', card.name);
				}
				else
				{
					throw new TypeError(`Invalid collector number: ${cardNum}`)
				}
			}
			else
			{
				const language = config?.language ?? EnumScryfallLanguages.English;

				linkUrl = `https://api.scryfall.com/cards/${card.set!.toLowerCase()}/${cardNum}/${language}`
			}

			linkUrl = _toURL(linkUrl);

			linkUrl.searchParams.set('format', 'image');

			if (config?.imageFormat)
			{
				linkUrl.searchParams.set('version', config.imageFormat);
			}

			if (config?.imageFaceBack)
			{
				linkUrl.searchParams.set('face', 'back');
			}

			break
		case EnumImgSource.urzaCo:

			if (!cardNum)
			{
				throw new TypeError(`Invalid collector number: ${cardNum}`)
			}

			let paddedNum = _padZero(cardNum, 3);
			// @ts-ignore
			if (isNaN(paddedNum.slice(-1)))
			{
				paddedNum = _padZero(paddedNum, 4);
			}

			linkUrl = `https://s3.urza.co/cards/${card.set!.toLowerCase()}/front/200dpi/${paddedNum}.jpg`;

			break
		default:
			if (!card!.multiverseid)
			{
				if (card.name?.length)
				{
					linkUrl = new URL(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card`)

					linkUrl.searchParams.set('name', _handleName(card.name));
				}
				else
				{
					throw new TypeError(`Invalid multiverseid: ${card!.multiverseid}`)
				}
			}
			else
			{
				linkUrl = `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`
			}

			break
	}

	return _toURL(linkUrl)
}

export default getImageSourceURL
