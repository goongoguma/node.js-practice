const request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = `https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?units=us&lang=ko`

  request({ url, json: true}, (error, response) => {
    const {temperature, precipProbability} = response.body.currently
    const {summary} = response.body.daily.data[0]
    if(error) {
      callback('Unable to connect to weather service', undefined)
    } else if (error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        summary,
        temperature,
        precipProbability,
      })
    }
  })
}

module.exports = forecast