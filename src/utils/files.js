const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const readFileInChunks = (file) => {
  const jsonStream = StreamArray.withParser();
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(file, { encoding: 'utf-8' }).pipe(jsonStream.input);

    jsonStream.on('data', ({ value }) => {
      data.push(value);
    });

    jsonStream.on('end', () => {
      resolve(data);
    });

    jsonStream.on('error', (err) => {
      reject({});
    });
  });
};

module.exports = { readFileInChunks };
