import { parse } from 'csv-parse';

function parseAsync(input) {
  return new Promise((resolve, reject) => {
    parse(input, {
      columns: true,
      skip_empty_lines: true
    }, function (err, records) {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
}

export { parseAsync as default, parseAsync };
//# sourceMappingURL=index.esm.mjs.map
