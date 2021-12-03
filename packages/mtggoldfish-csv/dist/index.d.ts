export interface IMTGGoldfishCollectionCard {
	Card: string;
	"Set ID": string;
	"Set Name": string;
	Quantity: `${number}`;
	Foil: string;
}
export declare type IMTGGoldfishCollectionCSV = IMTGGoldfishCollectionCard[];
export declare function parseAsync(input: string | Uint8Array): Promise<IMTGGoldfishCollectionCSV>;
export default parseAsync;

export {};
