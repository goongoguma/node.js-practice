const express = require('express');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port' + port)
})

const jwt = require('jsonwebtoken');

const myFunction = async() => {
  // 토큰생성
  // 첫번째 인수는 토큰에 들어갈 객체형태의 데이터, 두번째 인수는 토큰 시크릿, 세번째는 옵션(expiresIn은 토큰 만료기간설정 )
  const token = jwt.sign({ _id: 'abc12345' }, 'I am iron man', {expiresIn: '7 days'})
  console.log(token)

  // 토큰 확인
  // 첫번째 인수는 만든 토큰, 두번째 인수는 토큰 시크릿
  const data = jwt.verify(token, 'I am iron man')
  console.log(data)
}

myFunction()