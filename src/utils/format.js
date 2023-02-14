const removeQuotes = (str) => {
  return str.replace(/['"]+/g, '');
};

const paginate = (items, page = 1, limit = 8) => {
  const perPage = limit || 8;
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * page);
  const totalItems = items.length;

  return {
    paginatedItems,
    totalPages,
    totalItems,
  };
};

module.exports = { removeQuotes, paginate };
