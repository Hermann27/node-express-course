const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");

require("dotenv").config(); // load environment variables from .env file

// middleware
app.use(express.json()); // parse JSON data from incoming requests

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager");
});

app.use("/api/v1/tasks", tasksRouter);

//app.get('/api/v1/tasks') //get all tasks
//app.post('/api/v1/tasks') //create a new task
//app.get('/api/v1/tasks/:id') //get single task
//app.patch('/api/v1/tasks/:id') //update task
//app.delete('/api/v1/tasks/:id') //delete task

const port = 3000;
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
