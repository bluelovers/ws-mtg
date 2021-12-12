import { DeckLibrary, ICardOfLibrary } from 'mtg-decklist-to-library';
import { IOptionsDeckLibraryWithShuffle } from './types';
import { getRandomFromOptions, rngArrayShuffle } from './util/rand';
import { splitThenMerge } from './method/splitThenMerge';
import { Decklist } from 'mtg-decklist-parser2';
import { distributeCards } from './method/distributeCards';
import { ensureLands } from './method/ensureLands';
import { int } from '@lazy-random/util-distributions';

export class DeckLibraryWithShuffle<T = {}> extends DeckLibrary<ICardOfLibrary<T>>
{

	public _options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>;

	constructor(deck: Decklist, options?: IOptionsDeckLibraryWithShuffle<ICardOfLibrary<T>>)
	{
		super(deck, options);
	}

	options(options?: IOptionsDeckLibraryWithShuffle): IOptionsDeckLibraryWithShuffle
	{
		return {
			...this._options,
			...options,
		}
	}

	override shuffleStarting()
	{
		let options = this.options();

		const random = getRandomFromOptions(options);

		options.ensureLands ??= int(random, 0, 2);

		let cards = [
			distributeCards,
			splitThenMerge,
			ensureLands,
		].reduce((cards, fn) => fn(cards, options, this), this.cards);

		this.cards = cards;
		this._shuffleStarting = true;
	}

	override shuffle(isStarting?: boolean)
	{
		let random = getRandomFromOptions(this.options());

		if (isStarting)
		{

		}

		rngArrayShuffle(random, this.cards, true);
	}

}
