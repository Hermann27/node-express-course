const express = require("express");
const app = express();

const peopleRouter = require("./routes/people.js");
const authRouter = require("./routes/auth.js");

app.use(express.static("./methods-public")); //static assets
app.use(express.urlencoded({ extended: false })); //parse form data
app.use(express.json()); //parse json data

app.use("/api/v1/people", peopleRouter); //middleware for people routes
app.use("/login", authRouter); //middleware for auth routes

const { products } = require("./data.js");
const morgan = require("morgan");
const logger = require("./logger.js"); //middleware
const authorize = require("./authorize.js"); //middleware

app.use(express.static("./public"));
app.use(morgan("tiny")); //middleware

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }
  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, maxPrice, regex } = req.query;
  let sortedProducts = [...products];

  // Filter by starting letters
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  // Limit the number of results
  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }
  // Filter by max price
  if (maxPrice) {
    sortedProducts = sortedProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }
  /* 
    Filter by regular expression
    'i' for case-insensitive matching  
  */
  if (regex) {
    const regexPattern = new RegExp(regex, "i");
    sortedProducts = sortedProducts.filter((product) =>
      regexPattern.test(product.name)
    );
  }
  // If no products found, return an empty array
  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  // If products found, return the sorted array
  res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});
app.listen(3000, () => {
  console.log("server is listening on port 3000...");
});
