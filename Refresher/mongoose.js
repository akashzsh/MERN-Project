const mongoose = require("mongoose");
require("dotenv").config();
const ProductModel = require("./models/product");

mongoose
  .connect(
    `mongodb+srv://akashzsh:${process.env.MONGODBPASSWORD}@mern.5gjhp6e.mongodb.net/products_test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((error) => {
    console.log(error);
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new ProductModel({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json({ result });
};

exports.createProduct = createProduct;
