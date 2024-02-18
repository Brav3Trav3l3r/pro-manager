const Task = require('../model/taskModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.user._id });

  res.status(200).json({
    status: 'success',
    data: { tasks },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, priority, checklists, dueDate, createdAt } = req.body;

  const task = await Task.create({
    title,
    priority,
    checklists,
    dueDate,
    createdAt,
    createdBy: req.user._id,
  });

  res.status(200).json({
    message: 'success',
    data: { task },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { title, priority, checklists, dueDate } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: req.user._id },
    {
      title,
      priority,
      checklists,
      dueDate,
    },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    throw new Error('Task not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: { task: updatedTask },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: req.user._id,
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(204).json({
    status: 'success',
  });
});
