import { getImageSourceURL } from '../src/index';
import { EnumImgSource } from '../src/index';

const doubleFaceCard = 'Sea Gate Restoration // Sea Gate, Reborn';

describe(`gatherer`, () =>
{

	test(doubleFaceCard, () =>
	{

		let actual = getImageSourceURL({
			name: doubleFaceCard,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`multiverseid=491706`, () =>
	{

		let actual = getImageSourceURL({
			multiverseid: 491706,
		});

		expect(actual).toMatchSnapshot();

	});

});

describe(`scryfall`, () =>
{

	test(doubleFaceCard, () =>
	{

		let actual = getImageSourceURL({
			name: doubleFaceCard,
		}, {
			imgSource: EnumImgSource.scryfall,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`multiverseid=491706`, () =>
	{

		let actual = getImageSourceURL({
			multiverseid: 491706,
		}, {
			imgSource: EnumImgSource.scryfall,
		});

		expect(actual).toMatchSnapshot();

		actual = getImageSourceURL({
			multiverseid: 491706,
		}, {
			imgSource: EnumImgSource.scryfall,
			imageFaceBack: true,
		});

		expect(actual).toMatchSnapshot();

	});

	test(`mtgoID=83105`, () =>
	{

		let actual = getImageSourceURL({
			mtgoID: '83105',
		}, {
			imgSource: EnumImgSource.scryfall,
		});

		expect(actual).toMatchSnapshot();

		actual = getImageSourceURL({
			mtgoID: '83105',
		}, {
			imgSource: EnumImgSource.scryfall,
			imageFaceBack: true,
		});

		expect(actual).toMatchSnapshot();

	});

});
