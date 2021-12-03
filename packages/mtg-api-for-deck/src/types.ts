import { Rarity } from 'scryfall-api/lib/types/Rarity';
import { Card } from 'scryfall-api';

export type IScryfallCardType = [mainTypes: string[], subTypes?: string[]];

export const enum EnumGroupCardType
{
	Sorcery = 'Sorcery',
	Instant = 'Instant',
	Planeswalker = 'Planeswalker',
	Enchantment = 'Enchantment',
	Artifact = 'Artifact',
	Creature = 'Creature',
	Land = 'Land',

	Commander = 'Commander',
	Uncategorized = 'Uncategorized',

	Sideboard = 'Sideboard',
	Companion = 'Companion',
}

export type IRarity = keyof typeof Rarity

export type IScryfallCardInput = Card & {
	collector_number: number | string,
}
