const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
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
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch(error) {
    res.status(400).send();
  }
})

// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users);
//   } catch(error) {
//     res.status(500).send();
//   }
// })

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      // 발견한 토큰이 인증때 사용한 토큰이면 true 아니면 false
      return token.token !== req.token
    })
    // 발견되면 저장하고 200 코드 보내주기
    await req.user.save()
    res.send()
  } catch(e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch(e) {
    res.status(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})
 
// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id
//   try {
//     const user = await User.findById(_id)
//     if(!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch(error) {
//     res.status(500).send();
//   }
// })

router.patch('/users/me', auth, async(req, res) => { 
  const updates = Object.keys(req.body); // [age, _id, name, __V]
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    // const user = await User.findById(req.params.id)
    updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save()

    res.send(req.user)
  } catch(error) {
    res.status(400).send(error)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch(error) {
    res.status(500).send()
  }
})

module.exports = router