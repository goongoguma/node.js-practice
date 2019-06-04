const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch(error) {
    res.status(400).send(error);
  }
})

router.post('/users/login', async (req, res) => {
  try {
    // findByCredentials은 이메일과 비밀번호를 받아 유저를 반환함
    const user = await User.findByCredentials(req.body.email, req.body.password);

    // 특정 유저에게만 토큰을 전달할것
    const token = await user.generateAuthToken();

    res.send({user, token});
  } catch(error) {
    res.status(400).send();
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users);
  } catch(error) {
    res.status(500).send();
  }
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if(!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch(error) {
    res.status(500).send();
  }
})

router.patch('/users/:id', async(req, res) => { 

  const updates = Object.keys(req.body); // [age, _id, name, __V]
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
      
    const user = await User.findById(req.params.id)

    updates.forEach((update) => {
      user[update] = req.body[update]
    })

    await user.save()

    if(!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch(error) {
    res.status(400).send(error)
  }
})

router.delete('/users/:id', async(req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch(error) {
    res.status(500).send()
  }
})

module.exports = router