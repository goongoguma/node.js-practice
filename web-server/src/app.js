const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jae Hyun',
    footer: 'Created by Some name'
  })
})

app.get('/about',(req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jae Hyun',
    footer: 'Created by Some name'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Do you need help?',
    name: 'Jae Hyun',
    helpmessage: 'This is some helpful text',
    footer: 'Created by Some name'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
      if(error) {
        return console.log(error)
      } 
      forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      })
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jae Hyun',
    errorMessage: 'Help article not found'
  })
})

// *의 뜻 -> 그동안 매치 안된 url을 매치시킨다는것 
// 이 라우트는 마지막에 셋업되어야 한다.
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jae Hyun',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})