const express = require('express');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently donw. Check back soon!')
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port' + port)
})

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  // task와는 반대로 유저의 id를 사용할것 
  const user = await User.findById('5d01aaacf3e62034d0170e2c');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
}

main();
