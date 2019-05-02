const https = require('https')
const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/40, -75'

const request = https.request(url, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data = data + chunk.toString()
    console.log(chunk)
  })

  res.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
  
  request.on('error', (error) => {
    console.log('An error', error)
  })

})


request.end()