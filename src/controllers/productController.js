const { StatusCodes } = require('http-status-codes');
const path = require('path');

const CustomError = require('../errors');
const { readFileInChunks, paginate } = require('../utils');

const getAllProducts = async (req, res) => {
  const { search } = req.query;

  let products = await readFileInChunks(
    path.resolve(__dirname, '../../data/products.json')
  );

  if (search) {
    const filteredProducts = products.filter((product) => {
      if (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return product;
      }
    });

    products = filteredProducts;
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 8;

  const {
    paginatedItems,
    totalPages,
    totalItems: totalProducts,
  } = paginate(products, page, limit);

  products = paginatedItems;

  res.status(StatusCodes.OK).json({ products, totalPages, totalProducts });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const products = await readFileInChunks(
    path.resolve(__dirname, '../../data/products.json')
  );

  const product = products.find((product) => product.id === +productId);

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id of ${productId}`
    );
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};
