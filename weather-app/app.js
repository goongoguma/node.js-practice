const request = require('request')

// const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko'

// request({ url: url, json: true }, (error, response) => {
//   if(error) {
//     console.log('Unable to connect to weather service')
//   } else if(response.body.error) {
//     console.log('Unable to find location')
//   } else {
//     const weatherInfo = response.body.currently
//     console.log(`${response.body.daily.data[0].summary} It is currently ${weatherInfo.temperature} degrees out. There is a ${weatherInfo.precipProbability}% chance of rain.`)
//   }
// })

// Geocoding
// Address -> Lat / Long -> Weather
const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1'

request ({ url: url2, json: true}, (error, response) => {
  
  if(error) {
    console.log('Unable to connect to location service')
  } else if(response.body.features.length === 0) {
    console.log('Unable to find location try another search')
  } else {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude, longitude)
  }
})
