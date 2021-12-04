import { COLOR_PRIORITY, compareWUBRG } from '../src/index';

test(`['R','U','W','G','B' ]`, () =>
{

	let actual = ['R', 'U', 'W', 'G', 'B'].sort(compareWUBRG);

	expect(actual).toStrictEqual(COLOR_PRIORITY);

});

test(`['WR', 'W' ]`, () =>
{

	let actual = ['WR', 'W'].sort(compareWUBRG);

	expect(actual).toMatchSnapshot();

});

/**
 * @FIXME
 */
test(`WU, UB, BR, RG, GW, WB, UR, BG, RW, GU`, () =>
{

	let actual = ['WU', 'UB', 'BR', 'RG', 'GW', 'WB', 'UR', 'BG', 'RW', 'GU'].sort(compareWUBRG);

	expect(actual).toMatchSnapshot();

});
