'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var csvParse = require('csv-parse');

function parseAsync(input) {
  return new Promise((resolve, reject) => {
    csvParse.parse(input, {
      columns: true,
      skip_empty_lines: true,
      skip_records_with_error: true
    }, function (err, records) {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
}

exports["default"] = parseAsync;
exports.parseAsync = parseAsync;
//# sourceMappingURL=index.cjs.development.cjs.map
