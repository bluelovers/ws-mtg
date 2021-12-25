import { EnumGroupCardType } from './types';

export const GROUP_CARD_TYPE_PRIORITY = [
	EnumGroupCardType.Sorcery,
	EnumGroupCardType.Instant,
	EnumGroupCardType.Planeswalker,
	EnumGroupCardType.Enchantment,
	EnumGroupCardType.Artifact,
	EnumGroupCardType.Creature,
	EnumGroupCardType.Land,
] as const;

export const GROUP_CARD_TYPE_DISPLAY_PRIORITY = [
	EnumGroupCardType.Commander,
	EnumGroupCardType.Companion,

	EnumGroupCardType.Creature,
	EnumGroupCardType.Planeswalker,
	EnumGroupCardType.Artifact,
	EnumGroupCardType.Enchantment,
	EnumGroupCardType.Instant,
	EnumGroupCardType.Sorcery,
	EnumGroupCardType.Land,

	EnumGroupCardType.Sideboard,

	EnumGroupCardType.Uncategorized,
] as const;
