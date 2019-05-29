const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// const User = mongoose.model('User', {
//   name: {
//     type: String
//   },
//   age: {
//     type: Number
//   }
// })

// const me = new User({
//   name: 'Vladimir',
//   age: 500
// })

// me.save().then((me) => {
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })

const Task = mongoose.model('tasks', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const todo = new Task({
  description: '집청소하기',
  completed: false
})

todo.save().then(() => {
  console.log(todo)
}).catch(error =>
  console.log(error))
