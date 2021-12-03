import { CardModel, Decklist } from 'mtg-decklist-parser2';
import { ScryfallDecklist } from '../deck/scryfall';
import { Cards } from 'scryfall-api';
import Bluebird from 'bluebird';

export async function importByDecklist(decklist: Decklist, initScryfallDecklist?: ScryfallDecklist)
{
	initScryfallDecklist ??= new ScryfallDecklist();

	const _queryCardAndAdd = (card: CardModel, zone: 'deck' | 'sideboard' | 'companion' | 'commander', amount: number) => {
		return _queryCard(card)
			.then(apiResult => initScryfallDecklist?.addByApiResult(apiResult, 'deck', amount ?? card.amount))
	}

	await Bluebird.mapSeries(([
		'deck',
		'sideboard',
	] as const), (zone) => {
		return Bluebird.mapSeries(decklist[zone].slice(), card => card && _queryCardAndAdd(card, zone, card.amount))
	});

	await Bluebird.mapSeries(([
		'companion',
		'commander',
	] as const), (zone) => {
		const card = decklist[zone];

		return card && _queryCardAndAdd(card, zone, card.amount)
	});

	return initScryfallDecklist
}

export function _queryCard(card: CardModel)
{
	console.log(`start`, card.toCardString())
	return Cards.byName(card.name, card.set?.toLowerCase())
}
