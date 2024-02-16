const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A task must have a name'],
    unique: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
  state: {
    type: String,
    default: 'backlog',
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  finishedAt: {
    type: Date,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
