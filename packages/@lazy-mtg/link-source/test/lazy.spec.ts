import { getLinkSourceURL, EnumLinkSource } from '../src/index';

const doubleFaceCard = 'Sea Gate Restoration // Sea Gate, Reborn';

describe(`gatherer`, () =>
{

	test(doubleFaceCard, () =>
	{

		let actual = getLinkSourceURL({
			name: doubleFaceCard,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`multiverseid=491706`, () =>
	{

		let actual = getLinkSourceURL({
			multiverseid: 491706,
		});

		expect(actual).toMatchSnapshot();

	});

});

describe(`scryfall`, () =>
{

	test(doubleFaceCard, () =>
	{

		let actual = getLinkSourceURL({
			name: doubleFaceCard,
		}, {
			linkSource: EnumLinkSource.scryfall,
		});

		console.log(actual.toString())

		expect(actual).toMatchSnapshot();

		actual = getLinkSourceURL({
			name: doubleFaceCard,
		}, {
			linkSource: EnumLinkSource.scryfall,
			language: 'zht',
		});

		console.log(actual.toString())

		expect(actual).toMatchSnapshot();

	});

	test(`multiverseid=491706`, () =>
	{

		let actual = getLinkSourceURL({
			multiverseid: 491706,
		}, {
			linkSource: EnumLinkSource.scryfall,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`mtgoID=83105`, () =>
	{

		let actual = getLinkSourceURL({
			mtgoID: '83105',
		}, {
			linkSource: EnumLinkSource.scryfall,
		});

		expect(actual).toMatchSnapshot();

	});

});
