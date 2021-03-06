const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
  
    email: {
      type: String,
      unique: true,
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
    },
    
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  }, {
    timestamps: true
  }
);

// virtual은 실제 DB에 있는 데이터가 아니라 두개의 엔티티(모델)의 관계를 나타낸다
// 즉, 실제적으로 DB의 데이터는 건드리지 않고 두개의 관계를 이용해 필요한 데이터를 확인할 때 쓴다
userSchema.virtual('tasks', {
  ref: 'Task',
  // 유저의 id 
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
  const user = this;
  // 유저데이터 
  // userObject를 이용해 원하는 데이터만을 노출시킬 수 있다. 
  const userObject = user.toObject();

  // userObject안에서 필요없는 데이터 지우기
  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this;

  // jwt 만들기
  const token = jwt.sign({ _id: user._id.toString() }, 'Iamironman')

  user.tokens = user.tokens.concat({ token: token})
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
 
  const user = await User.findOne({ email: email })

  if(!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}


userSchema.pre('save', async function(next) {

  const user = this;
  
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  };
  next();
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({ owner: user._id })
  next();
})

const User = mongoose.model('User', userSchema)

module.exports = User