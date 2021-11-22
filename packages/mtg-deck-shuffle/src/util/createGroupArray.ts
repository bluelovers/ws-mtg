export function createGroupArray<T, N extends number = 4>(length: N): T[][] & {
	readonly length: N
}
{
	const arr: T[][] = [];

	for (let i = 0; i < length; i++)
	{
		arr.push([]);
	}

	return arr as any;
}
