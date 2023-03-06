const mongoose = require("mongoose");
const ProductModel = require("./models/product");

const createProduct = async (req, res, next) => {
  const createdProduct = new ProductModel({
    name: req.body.name,
    price: req.body.price,
  });
};

exports.createProduct = createProduct;
