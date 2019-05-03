const request = require('request')

const geocode = (address, callback) => {
  // encodeURIComponent를 써주면 특수문자가 들어간 단어도 검색 가능해진다
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1`

  request({ url, json: true}, (error, {body}) => {
    const {center, place_name} = body.features[0]
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location try another search', undefined)
    } else {
      callback(undefined, {
        latitude: center[0],
        longitude: center[1],
        location: place_name
      })
    }
  })
}

module.exports = geocode