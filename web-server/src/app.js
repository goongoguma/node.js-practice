const express = require('express')
const path = require('path')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
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