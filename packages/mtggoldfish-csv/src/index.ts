import { parse } from 'csv-parse';
// @ts-ignore
import { parse as _parseSync } from 'csv-parse/sync';

export interface IMTGGoldfishCollectionCard
{
	Card: string,
	'Set ID': string,
	'Set Name': string,
	Quantity: `${number}`,
	Foil: string
}

export type IMTGGoldfishCollectionCSV = IMTGGoldfishCollectionCard[];

/*
export function parseSync(input: string | Uint8Array): IMTGGoldfishCollectionCSV
{
	return _parseSync(input as any, {
		columns: true,
		skip_empty_lines: true,
	})
}
 */

export function parseAsync(input: string | Uint8Array)
{
	return new Promise<IMTGGoldfishCollectionCSV>((resolve, reject) =>
	{
		parse(input as any, {
			columns: true,
			skip_empty_lines: true,
		}, function (err, records)
		{
			if (err)
			{
				reject(err)
			}
			else
			{
				resolve(records)
			}
		});
	})
}

export default parseAsync
