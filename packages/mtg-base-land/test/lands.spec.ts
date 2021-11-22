import parseSnowCoveredOrBaseLand, { BASE_LAND_ARRAY, SNOW_BASE_LAND_ARRAY, toSnowBaseLand } from '../src/index';

describe(`Base Lands`, () =>
{

	BASE_LAND_ARRAY.forEach(name =>
	{

		describe(name, () =>
		{

			test(`parseSnowCoveredOrBaseLand`, () =>
			{

				let actual = parseSnowCoveredOrBaseLand(name);

				expect(actual).toMatchSnapshot({
					snow: false,
				});

			});

			test(`toSnowBaseLand`, () =>
			{

				let actual = toSnowBaseLand(name);

				expect(actual).toMatchSnapshot();
				expect(parseSnowCoveredOrBaseLand(actual)).toMatchSnapshot({
					snow: true,
				});

			});

		});

	});

});

describe(`Snow Base Lands`, () =>
{

	SNOW_BASE_LAND_ARRAY.forEach(name =>
	{

		describe(name, () =>
		{

			test(`parseSnowCoveredOrBaseLand`, () =>
			{

				let actual = parseSnowCoveredOrBaseLand(name);

				expect(actual).toMatchSnapshot({
					snow: true,
				});

			});

			test(`toSnowBaseLand`, () =>
			{

				let actual = toSnowBaseLand(name);

				expect(actual).toStrictEqual(name);

			});

		});

	});

});
