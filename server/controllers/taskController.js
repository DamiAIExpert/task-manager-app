const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks (with user information)
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).populate('user', 'name email');
  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    user: req.user._id,
    phase: 'Todo', // Automatically start in the Todo phase
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Get a task by ID (with user information)
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('user', 'name email');

  if (task && task.user._id.equals(req.user._id)) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update a task's details and/or phase/status
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, phase } = req.body;

  const task = await Task.findById(req.params.id);

  if (task && task.user._id.equals(req.user._id)) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.phase = phase || task.phase;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user._id.equals(req.user._id)) {
    await task.remove();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
