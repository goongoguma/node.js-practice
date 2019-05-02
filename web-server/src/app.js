const express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// 핸들바 셋업
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jae Hyun'
  })
})

app.get('/about',(req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jae Hyun'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Do you need help?',
    helpmessage: 'This is some helpful text'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Incheon',
    forecast: 'clear sky'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})