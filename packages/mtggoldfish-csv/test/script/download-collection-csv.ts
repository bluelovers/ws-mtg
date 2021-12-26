/**
 * Created by user on 2021/12/21.
 */

import fetch from 'cross-fetch';
import { outputFile } from 'fs-extra';
import { join } from 'path';
import { __root } from '../__root';
import { COOKIES_MTGARENA_PRO } from '../_cookies.local';

fetch("https://mtgarena.pro/mtg/do3.php?cmd=export", {
	"headers": {
		"cookie": COOKIES_MTGARENA_PRO,
	},
	"method": "GET",
})
	.then(res =>
	{
		return res.text()
	})
	.then(csv => outputFile(join(__root, 'test', 'collection.csv'), csv))
;
