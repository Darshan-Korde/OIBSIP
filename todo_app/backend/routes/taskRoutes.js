const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create Task
router.post('/add', async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  await task.save();
  res.json(task);
});

// Get All Tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Mark as Completed
router.put('/complete/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { status: 'completed', completedAt: new Date() }, { new: true });
  res.json(task);
});

// Delete Task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Edit Task
router.put('/edit/:id', async (req, res) => {
  const { title } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title }, { new: true });
  res.json(task);
});

module.exports = router;
