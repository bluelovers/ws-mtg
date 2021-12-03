import { ScryfallCardModel } from '../card/scryfall';
import { AbstractDeck, SymDecklistType } from 'mtg-decklist-parser2';
import { IScryfallCardInput } from '../types';

export class ScryfallDecklist<CARD extends ScryfallCardModel = ScryfallCardModel> extends AbstractDeck<CARD>
{

	readonly [SymDecklistType] = 'scryfall' as const;

	constructor(apiResultList?: IScryfallCardInput[])
	{
		super()

		// @ts-ignore
		this.valid = false;

		if (apiResultList?.length)
		{
			apiResultList.forEach(apiResult =>
			{
				this.addByApiResult(apiResult)
			});

			// @ts-ignore
			this.valid = true;
		}
	}

	addByApiResult(apiResult: IScryfallCardInput,
		zone?: 'deck' | 'sideboard' | 'companion' | 'commander',
		amount?: number,
	)
	{
		zone ??= 'deck';

		const card = this._newCardModel(apiResult, amount);

		if (zone === 'commander' || zone === 'companion')
		{
			this[zone] = card
		}
		else
		{
			this[zone].push(card)
		}

		return card
	}

	protected override _newCardModel(apiResult: IScryfallCardInput, amount?: number)
	{
		const card = new ScryfallCardModel(apiResult) as CARD;

		card.amount = amount ?? card.amount;

		return card
	}

}

