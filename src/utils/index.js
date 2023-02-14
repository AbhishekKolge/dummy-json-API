const { removeQuotes, paginate } = require('./format');
const { readFileInChunks } = require('./files');

module.exports = {
  removeQuotes,
  paginate,
  readFileInChunks,
};
