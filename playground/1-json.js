const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const profileData = JSON.parse(dataJSON)
profileData.name = '홍길동'
profileData.planet = '화성'
const JSONdata = JSON.stringify(profileData)
fs.writeFileSync('1-json.json', JSONdata)
