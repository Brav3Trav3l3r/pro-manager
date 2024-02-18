const mongoose = require('mongoose');

const checkListSchecma = new mongoose.Schema({
  checked: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'moderate', 'low'],
    required: true,
  },
  checklists: {
    type: [checkListSchecma],
    required: true,
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: 'Please add at least one checklist',
    },
  },
  dueDate: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: mongoose.ObjectId,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
