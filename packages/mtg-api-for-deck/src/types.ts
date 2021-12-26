import { Rarity } from 'scryfall-api/lib/types/Rarity';
import { Card } from 'scryfall-api';

export type IScryfallCardType = [mainTypes: string[], subTypes?: string[]];

export type IRarity = keyof typeof Rarity

export type IScryfallCardInput = Card & {
	collector_number: number | string,
}
