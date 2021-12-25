import type { ICardWithoutAmount } from 'mtg-decklist-parser2';
import type { ITSAndStringLiteral } from 'ts-type/lib/helper/string';

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

function pad(num: string | number, size: number)
{
	return String(num).padStart(size, '0')
}

export interface ICardForQueryInfo extends Partial<Omit<ICardWithoutAmount, 'mtgoID'>>
{
	multiverseid?: string | number,
	mtgoID?: string | number,
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

export interface IImageURLConfig
{
	imgSource?: ITSAndStringLiteral<EnumImgSource>,
	language?: string,

	/**
	 * only for scryfall
	 */
	imageFormat?: ITSAndStringLiteral<EnumScryfallImageFormat>,
	imageFaceBack?: boolean,
}

function handleName(name: string)
{
	return name.split(/\s*\/\/\s*/)[0]
}

export function getImageSourceURL(card: ICardForQueryInfo, config?: IImageURLConfig)
{
	let imgUrl: URL | string;

	const cardNum = card.collectors;

	switch (config?.imgSource)
	{
		case EnumImgSource.magicCardsInfo:
		case EnumImgSource.scryfall:

			if (!cardNum)
			{
				if (card.multiverseid)
				{
					imgUrl = `https://api.scryfall.com/cards/multiverse/${card.multiverseid}?format=image`
				}
				else if (card.mtgoID)
				{
					imgUrl = new URL(`https://api.scryfall.com/cards/mtgo/${card.mtgoID}`);
				}
				else if (card.name?.length > 0)
				{
					imgUrl = new URL(`https://api.scryfall.com/cards/named`);

					imgUrl.searchParams.set('fuzzy', card.name);
				}
				else
				{
					throw new TypeError(`Invalid collector number: ${cardNum}`)
				}
			}
			else
			{
				const language = config?.language ?? 'en';

				imgUrl = `https://api.scryfall.com/cards/${card.set!.toLowerCase()}/${cardNum}/${language}`
			}

			if (typeof imgUrl === 'string')
			{
				imgUrl = new URL(imgUrl);
			}

			imgUrl.searchParams.set('format', 'image');

			if (config?.imageFormat)
			{
				imgUrl.searchParams.set('version', config.imageFormat);
			}

			if (config?.imageFaceBack)
			{
				imgUrl.searchParams.set('face', 'back');
			}

			break
		case EnumImgSource.urzaCo:

			if (!cardNum)
			{
				throw new TypeError(`Invalid collector number: ${cardNum}`)
			}

			let paddedNum = pad(cardNum, 3);
			// @ts-ignore
			if (isNaN(paddedNum.slice(-1)))
			{
				paddedNum = pad(paddedNum, 4);
			}

			imgUrl = `https://s3.urza.co/cards/${card.set!.toLowerCase()}/front/200dpi/${paddedNum}.jpg`;

			break
		default:
			if (!card!.multiverseid)
			{
				if (card.name?.length)
				{
					imgUrl = new URL(`https://gatherer.wizards.com/Handlers/Image.ashx?type=card`)

					imgUrl.searchParams.set('name', handleName(card.name));
				}
				else
				{
					throw new TypeError(`Invalid multiverseid: ${card!.multiverseid}`)
				}
			}
			else
			{
				imgUrl = `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`
			}

			break
	}

	if (typeof imgUrl === 'string')
	{
		imgUrl = new URL(imgUrl);
	}

	return imgUrl
}

export default getImageSourceURL
