const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  res.status(200).json({ msg: "Get all tasks" });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({ task });
};
const getTask = async (req, res) => {
  res.status(200).json({ msg: `Get task ${req.params.id}` });
};
const updateTask = async (req, res) => {
  res.status(200).json({ msg: `Update task ${req.params.id}` });
};
const deleteTask = async (req, res) => {
  res.status(200).json({ msg: `Delete task ${req.params.id}` });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
