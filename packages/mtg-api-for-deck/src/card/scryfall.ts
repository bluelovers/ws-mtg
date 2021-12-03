import { CardModel } from 'mtg-decklist-parser2';
import { Card } from 'scryfall-api';
import { getCardMainTypes, parseScryfallCardTypeExtra } from '../util/parseScryfallCardType';
import { IRarity, IScryfallCardInput } from '../types';

export const SymRaw = Symbol.for('raw-card')

export class ScryfallCardModel extends CardModel
{
	[SymRaw]: Card;

	rarity: IRarity;
	mainTypes: string[];

	constructor(apiResult: IScryfallCardInput, amount?: number)
	{
		super({
			name: apiResult.name,
			set: apiResult.set.toUpperCase(),
			// @ts-ignore
			collectors: apiResult.collector_number,
		})

		this.amount = amount;

		this[SymRaw] = apiResult;
		this.mtgoID = apiResult.mtgo_id?.toString();

		this._init();
	}

	protected _init()
	{
		this.rarity = this[SymRaw].rarity;
		this.mainTypes = getCardMainTypes(parseScryfallCardTypeExtra(this[SymRaw].type_line));
	}

}
