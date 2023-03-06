const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = `mongodb+srv://akashzsh:${process.env.MONGODBPASSWORD}@mern.5gjhp6e.mongodb.net/?retryWrites=true&w=majority`;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("products_test");
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: `Could not save the data: ${error}` });
  }
  client.close();
  res.json({ newProduct });
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db("products_test");
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: `Could not fetch the data: ${error}` });
  }
  client.close();
  res.json({ products });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
