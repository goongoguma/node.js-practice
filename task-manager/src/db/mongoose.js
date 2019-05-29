const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    trim: true, 
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },

  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive number')
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Do not set password as a password')
      }
    }
  }
})

const me = new User({
  name: '   Jen',
  email: 'JEN@GOOGLE.COM',
  password: 'ewvrwewt34'
})

me.save().then((me) => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})

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
