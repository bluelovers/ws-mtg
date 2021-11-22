import { readFile } from 'fs-extra';
import { Decklist } from 'mtg-decklist-parser2';
import { DeckLibraryWithShuffle } from '../../src/library';
import { ICardWithoutAmount } from 'mtg-decklist-parser2';
import { join } from 'path';
import { __root } from '../__root';
import { groupByName } from '../../src/util/groupByName';
import { distributeGroup } from '../../src/util/distributeGroup';
import distributeCards from '../../src/method/distributeCards';
import { sumGroupCards } from '../../src/util/sumGroupCards';
import { filterLands } from '../../src/util/filterLands';

describe(`distributeCards`, () =>
{

	let cards: ICardWithoutAmount[];

	beforeEach(async () =>
	{
		cards = await readFile(join(__root, 'test', 'deck/whiteline.txt'))
			.then(rawString => new Decklist(rawString))
			.then(parsed =>
			{
				return new DeckLibraryWithShuffle(parsed).cards
			})
	});

	test(`groupByName`, () =>
	{

		let actual = groupByName(cards);

		expect(actual).toMatchSnapshot();

		expect(sumGroupCards(actual)).toStrictEqual(cards.length);

		let actual2 = distributeGroup(actual);

		expect(actual2).toMatchSnapshot();
		expect(actual2).toHaveProperty('length', cards.length);

	});

	test(`distributeCards`, () =>
	{

		let actual = distributeCards(cards);

		expect(actual).toMatchSnapshot();
		expect(actual).toHaveProperty('length', cards.length);

	});

	test(`distribute:baseLands`, () =>
	{
		let data = filterLands(cards);

		let actual = distributeGroup(groupByName(data.baseLands));

		expect(actual).toMatchSnapshot();

	});

	test(`distribute:snowLands`, () =>
	{
		let data = filterLands(cards);

		let actual = distributeGroup(groupByName(data.snowLands));

		expect(actual).toMatchSnapshot();

	});

	test(`distribute:others`, () =>
	{
		let data = filterLands(cards);

		let actual = distributeGroup(groupByName(data.others));

		expect(actual).toMatchSnapshot();

	});

	test(`distribute:check`, () =>
	{
		let data = [
			{
				"name": "Forest",
			},
			{
				"name": "Plains",
			},
			{
				"name": "Forest",
			},
			{
				"name": "Plains",
			},
			{
				"name": "Forest",
			},
			{
				"name": "Plains",
			},
		];

		let actual = distributeGroup(groupByName(data));

		expect(actual).toMatchSnapshot();
		expect(actual).toStrictEqual(data);

	});

});
