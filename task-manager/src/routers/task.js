const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
 // task를 생성한 유저의 정보와 연결시켜주기 
  const task = new Task({
    // task를 생성한 유저의 정보 + req.body에 있는 모든정보 받아오기
    ...req.body,
    // task의 owner 프로퍼티 생성 
    owner: req.user._id
  })

  try {
    await task.save();
    res.status(201).send(task)
  } catch(error) {
    res.status(400).send(error);
  }
})

router.get('/tasks', async (req, res) => {
 try {
   const tasks = await Task.find({})
   res.send(tasks);
 } catch(error) {
   res.status(500).send();
 }
})

router.get('/tasks/:id', async(req, res) => {
  const _id = req.params.id
 try {
   const task = await Task.findById(_id);
   if(!task) {
   return res.status(404).send()
  }
  res.send(task)
 } catch(error) {
   res.status(500).send();
 }
})

router.patch('/tasks/:id', async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})3
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => {
      task[update] = req.body[update]
    })

    await task.save()

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(error) {
    res.status(404).send(error)
  }
})

router.delete('/tasks/:id', async(req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error){
    res.status(500).send()
  }
})

module.exports = router