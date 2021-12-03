import { readFileSync } from 'fs';
import { join } from 'path';
import parseAsync from '../src/index';

test(`test`, async () =>
{
	const input = readFileSync(join(__dirname, './collection.csv')).toString();

	let actual = await parseAsync(input);

	expect(actual).toMatchSnapshot();

});

