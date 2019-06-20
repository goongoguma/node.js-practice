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

// GET /tasks?completed=true (or tasks?completed=false)
// GET /tasks?limit=10&skip=10 (skip은 지나간 페이지)
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  
  const match = {};
  const sort = {};

  // req.query.completed는 사용된 value의 값을 가지고있다. 
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    //  const tasks = await Task.find({ owner: req.user._id })
    await req.user.populate({
      path: 'tasks',
      match,
      // 페이지네이션을 위해 options 추가
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks);
  } catch(error) {
    res.status(500).send();
  }
})

router.get('/tasks/:id', auth, async(req, res) => {
  const _id = req.params.id
 try {
    //  const task = await Task.findById(_id);
    // 자기자신이 생성한 task를 DB에서 가져온다 
    const task = await Task.findOne({ _id, owner: req.user._id })

    if(!task) {
      return res.status(404).send()
    }
  res.send(task)
 } catch(error) {
    res.status(500).send();
 }
})

router.patch('/tasks/:id', auth, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})3
    // const task = await Task.findById(req.params.id);

    await task.save()

    if(!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })

    res.send(task)
  } catch(error) {
    res.status(404).send(error)
  }
})

router.delete('/tasks/:id', auth, async(req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error){
    res.status(500).send()
  }
})

module.exports = router