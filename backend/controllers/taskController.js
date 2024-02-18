const Task = require('../model/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, priority, checklists, dueDate, createdAt } = req.body;

  const task = await Task.create({
    title,
    priority,
    checklists,
    dueDate,
    createdAt,
  });

  res.status(200).json({
    message: 'success',
    data: task,
  });
});
