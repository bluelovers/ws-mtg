import { groupKeyByCardTypePriority } from '../src/filter/card-type';

test(`test`, () =>
{

	let actual = groupKeyByCardTypePriority([
		'Land',
		'Creature',
	]);

	expect(actual).toMatchSnapshot();

	actual = groupKeyByCardTypePriority('Land');

	expect(actual).toMatchSnapshot();

});


