const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// const Task = mongoose.model('tasks', {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// })

// const todo = new Task({
//   description: '    설거지하기',
//   completed: true
// })

// todo.save().then(() => {
//   console.log(todo)
// }).catch(error =>
//   console.log(error))
