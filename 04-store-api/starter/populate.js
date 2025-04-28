require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");
const start = async () => {
  try {
    // connect to the database
    await connectDB(process.env.MONGO_URI);
    // delete all existing products
    await Product.deleteMany();
    // insert new products from JSON file
    await Product.create(jsonProducts);
    console.log("Success! Products added to the database.");
    process.exit(0); // exit the process successfully
  } catch (error) {
    console.error(error);
    process.exit(1); // exit the process with an error code
  }
};
start();
// This script connects to a MongoDB database, deletes all existing products, and inserts new products from a JSON file. It uses async/await for asynchronous operations and handles errors appropriately. The process exits with a success or error code based on the outcome of the operations.
