const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");

require("dotenv").config(); // load environment variables from .env file

const notFound = require("./middleware/not-found"); // custom middleware for handling 404 errors
const errorHandlerMiddleware = require("./middleware/error-handler"); // custom middleware for handling errors
// middleware
app.use(express.static("./public")); // serve static files from the public directory
app.use(express.json()); // parse JSON data from incoming requests

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound); // use the notFound middleware for handling 404 errors
app.use(errorHandlerMiddleware); // use the errorHandlerMiddleware for handling errors

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
