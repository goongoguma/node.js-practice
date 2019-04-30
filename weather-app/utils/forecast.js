const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = `https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?units=us&lang=ko`

  request({ url: url, json: true}, (error, response) => {
    if(error) {
      callback('Unable to connect to weather service', undefined)
    } else if (response.body.error) {
      console.log(response.body)
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        summary: response.body.daily.data[0].summary,
        temperature: response.body.currently.temperature,
        precipProbability: response.body.currently.precipProbability,
      })
    }
  })
}

module.exports = forecast