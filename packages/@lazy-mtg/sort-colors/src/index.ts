import { COLOR_PRIORITY, EnumColor } from '@lazy-mtg/color-type';
import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export { COLOR_PRIORITY, EnumColor }

/**
 * @see https://markrosewater.tumblr.com/post/13840097441/whats-the-proper-number-order-for-multicoloured
 */
export function compareWUBRG(a: ITSAndTypeAndStringLiteral<EnumColor>,
	b: ITSAndTypeAndStringLiteral<EnumColor>,
): 0 | 1 | -1
{
	const c1: EnumColor = a[0] as any;
	const c2: EnumColor = b[0] as any;

	const len1 = c1?.length;
	const len2 = c2?.length;

	if (!len1 || !len2)
	{
		if (len1)
		{
			return 1
		}
		else if (len2)
		{
			return -1
		}

		return 0
	}

	const v1 = COLOR_PRIORITY.indexOf(c1);
	const v2 = COLOR_PRIORITY.indexOf(c2);

	if (v1 === v2)
	{
		return compareWUBRG(a.slice(1), b.slice(1))
	}

	return v1 > v2 ? 1 : -1
}

export default compareWUBRG
