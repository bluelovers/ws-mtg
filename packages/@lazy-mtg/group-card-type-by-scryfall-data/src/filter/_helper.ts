import { ITSAndTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { ITSArrayListMaybeReadonly, ITSValueOrArrayMaybeReadonly } from 'ts-type/lib/type/base';

export function dfGroupArrayFieldByPriority<T extends string>(priority: ITSArrayListMaybeReadonly<T>,
	defaultValue?: ITSAndTypeAndStringLiteral<T>,
)
{
	return (arrayValue: ITSValueOrArrayMaybeReadonly<ITSAndTypeAndStringLiteral<T>>) =>
	{
		let returnValue: T = defaultValue as any;

		arrayValue = [arrayValue].flat();

		priority.find(type =>
		{
			if (arrayValue.includes(type))
			{
				returnValue = type
				return true;
			}
		});

		return returnValue
	}
}

export function dfGroupFieldByPriority<T extends string>(priority: ITSArrayListMaybeReadonly<T>,
	defaultValue?: ITSAndTypeAndStringLiteral<T>,
)
{
	return (inputValue: ITSAndTypeAndStringLiteral<T>) =>
	{
		let returnValue: T = defaultValue as any;

		priority.find(type =>
		{
			if (inputValue === type)
			{
				returnValue = type
				return true;
			}
		});

		return returnValue
	}
}
