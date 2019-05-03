## Index

- [14. Remove 커맨드 만들기](#14)
- [15. List 커맨드 만들기](#15)
- [16. find vs filter ](#16)
- [17. 노드 디버깅해보기](#17)
- [18. 비동기 예제](#18)
- [19. request 라이브러리 사용해 http 요청보내기](#19)
- [20. http 요청 보내기 연습](#20)
- [21. 에러 방어코드 작성](#21)
- [22. 콜백함수 예제](#22)
- [23. geocode에 콜백함수 사용해보기](#23)
- [24. 콜백함수 연습](#24)
- [25. 콜백 체이닝](#25)
- [26. 구조분해할당](#26)
- [27. 순수 노드로 http 요청 보내보기](#27)
- [28. express를 사용해서 화면 그려주기](#28)
- [29. express에 html과 JSON 사용해보기](#29)
- [30. express에 정적 컨텐츠 사용하기 1](#30)
- [31. express에 정적 컨텐츠 사용하기 2](#31)
- [32. 핸들바 라이브러리 사용하기](#32)
- [33. views 경로 커스터마이징 해주기](#33)


<h2 name="14">14. Removing a Note</h2>

### Challenge 1 : Setup command option and function

1. Setup the remove command to take a required "--title" option
  ```js
    yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
  })
  ```
2. Create and export a removeNote function from notes.js
  ```js
    module.exports = {
    getNotes,
    addNote,
    removeNote
  }
  ```
3. Call removeNote in remove command handler
  ```js
    yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: (argv) => notes.removeNote(argv.title) 
  })
  ```
4. Have removeNote log the title of the note to be removed
  ```js
    const removeNote = (title) => {
    console.log(title)
  }
  ```
5. Test your work using node app.js remove --title="some title"
  ```js
  node app.js remove --title="Some title" // Some title
  ```

### Challenge 2 : Wire up removeNote

1. Load existing notes
2. Use array filter method to remove the matching note (if any)
3. Save the newly created array
4. Test your work with a title that exists and a title that does not exist
  ```js
    const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)
      saveNotes(newNotes)
  }
  ```

### Challenge 3 : Use chalk to provide useful logs for remove

1. If a note is removed, print 'Nice removed!' with a grenn background
2. If no note is removed, print 'No note found!' with a red background

  ```js
    const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)
    saveNotes(newNotes)
    if(notes.length > newNotes.length) {
      console.log(chalk.green.inverse('Note removed!'))
    } else {
      console.log(chalk.red.inverse('No note found!'))
    }
  }
  ```

<h2 name="15">15. Listing Notes</h2>

### Challenge : Wire up list command

1. Create and export listNotes from notes.js
  - "Your notes" using chalk
  - Print note title for each note
2. Call listNotes from command handler
3. Test your work

```js
// app.js
yargs.command({
  command: 'list',
  describe: 'list out the list',
  handler: () => notes.listNotes()
})

// notes.js
const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.bgCyan('Your notes'))
  notes.forEach(note => console.log(note.title))
}

module.exports = {
  getNotes,
  addNote,
  removeNotes,
  listNotes
}

// $ node app.js list
```
<h2 name="16">16. Reading a Note</h2>

- 기존 addNote같은경우 filter 메서드를 사용해서 새로운 배열을 생성할 수도 있으나 문제는 filter 메서드의 경우 모든 리스트를 검색한다는것에 있다.
- 예를들어 천개의 타이틀 리스트중 중간에 있는 특정 타이틀을 찾기위해 filter 메서드를 사용하게 된다면 중간 검색도중 원하는 타이틀을 찾았음에도 불구하고 멈추지 않고 끝까지 모든 타이틀을 검색한다. 
  ```js
    const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => note.title === title)
   
    if(!duplicateNotes.length) {
      notes.push({
        title,
        body
      })
      saveNotes(notes)
      console.log(chalk.bgGreen('New note added!'))
    } else {
      console.log(chalk.bgRed('Note title taken!'))
    }
  }
  ```
- 때문에 filter 대신 find 메서드를 사용할것
  ```js
    const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote) {
      notes.push({
        title,
        body
      })
      saveNotes(notes)
      console.log(chalk.bgGreen('New note added!'))
    } else {
      console.log(chalk.bgRed('Note title taken!'))
    }
  }
  ```
### Challenge : Wire up read command

1. Setup --title option for read command
  ```js
    yargs.command({
    command: 'read',
    describe: 'Read out the list',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: (argv) => notes.readNote(argv.title)
  })
  ```
2. Create readNote in notes.js
  - Search for note by title
  - Find note and print title (styled) and body (plain)
  - No note found? Print error in red
  ```js
    const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    
    if(note) {
      console.log(chalk.green.inverse(note.title))
      console.log(note.body)
    } else {
      console.log(chalk.red.inverse('Note not found'))
    }
  }
  ```
3. Have the command handler call the function
  ```js
    module.exports = {
    getNotes,
    addNote,
    removeNotes,
    listNotes,
    readNote
  }
  ```
4. Test your work by running a couple commands
  ```js
  // $ node app.js read --title="List"
  ```

<h2 name="17">17. Debugging Node.js</h2>

- 노드js 디버깅
  - console.log
  - node debugger
  ```js
    const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    debugger
    
    if(!duplicateNote) {
      notes.push({
        title,
        body
      })
      saveNotes(notes)
      console.log(chalk.bgGreen('New note added!'))
    } else {
      console.log(chalk.bgRed('Note title taken!'))
    }
  }

  // $ node inspect app.js --title="Courses" --body="Node.js"
  // chrome://inspect/#devices에서 debugger가 표시되어있는 라인까지의 내용을 Remote Target에서 확인 할 수 있다. 
  ```

<h2 name="18">18. Asynchronous Basics</h2>

  ```js
  console.log('Starting')

  setTimeout(() => {
    console.log('2 Second Timer')
  }, 2000)

  setTimeout(() => {
    console.log('0 Second Timer')
  }, 0)

  console.log('Stopping')

  // $ node app.js
  // Starting
  // Stopping
  // 0 Second Timer
  // 2 Second Timer
  ```

<h2 name="19">19. Customizing HTTP Requests</h2>

- request 라이브러리와 darksky api를 사용해 날씨앱 만들기

  ```js
  const request = require('request')

  const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233'

  // json: true는 url에서 받은 데이터를 객체로 파싱해준다
  request({ url: url, json: true }, (error, response) => {
    console.log(response.body.currently)
  })
  ```
### Challenge: Print a small forecast to the user

1. Print: 'It is currently 58.55 degrees out. There is a 0% change of rain.'
2. Test your work
  ```js
    request({ url: url, json: true }, (error, response) => {
    const weatherInfo = response.body.currently
    console.log(`It is currently ${weatherInfo.temperature} degrees out. There is a ${weatherInfo.precipProbability} chance of rain.`)
  })
  ```
- 뒤에 옵션을 더 붙여줌으로써 원하는 정보를 추가적으로 얻을 수 있다. 
  ```js
  const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko'

  request({ url: url, json: true }, (error, response) => {
    const weatherInfo = response.body.currently
    console.log(`${response.body.daily.data[0].summary} It is currently ${weatherInfo.temperature} degrees out. There is a ${weatherInfo.precipProbability}% chance of rain.`)
  })

  // 저녁에 약간 흐림 시작 It is currently 50.3 degrees out. There is a 0% chance of rain.
  ```

<h2 name="20">20. An HTTP Request Challenge</h2>

- Geocoding api를 이용해 받은 위도 / 경도 정보를 날씨앱에 전달해 원하는 장소의 날씨를 찾아볼 것임

### Challenge: Print the lat/long for Los Angeles

1. First off a new request to the URL explored in browser
2. Have the request module parse it as JSON
  ```js
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1'

  request ({ url: url2, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude, longitude)
  })
  ```
3. Print both the latitude and longitude to the terminal
  ```js
  // $ node app.js 
  // 34.0544 -118.2439
4. Test your work!

<h2 name="21">21. Handling Errors</h2>

  ```js
  const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko'
  
   request({ url: url, json: true }, (error, response) => {
  if(error) {
    console.log('Unable to connect to weather service')
  } else if(response.body.error) { // 400
    console.log('Unable to find location')
  } else {
    const weatherInfo = response.body.currently
    console.log(`${response.body.daily.data[0].summary} It is currently ${weatherInfo.temperature} degrees out. There is a ${weatherInfo.precipProbability}% chance of rain.`)
  }
})
  ```
### Challenge: Handle errors for geocodiing request

1. Setup an error handler for low-level errors
2. Test by disabling network request and running the app
3. Setup error handling for no matching results
  ```js
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
  ```
4. Test by altering the search term and running the app

<h2 name="22">22. The Callback Function</h2>

### Challenge: Mess around with the callback pattern

1. Define an add function that accepts the correct arguments
2. Use setTimeout to simulate a 2 second delay
3. After 2 seconds are up, all the callback function with the sum
  ```js
    const add = (num1, num2, callback) => {
    setTimeout(() => {
      callback(num1 + num2)
    }, 2000)
  }

  add(1, 4, (sum) => {
    console.log(sum) // 5
  })
  ```
4. Test your work

<h2 name="23">23. Callback Abstraction</h2>

- 이번에는 함수안에서 http 요청을 하는 진짜 함수를 만들어볼것임
- darksky api에서 받은 위도와 경도값을 geoCoding 함수에 넣어줬지만 함수가 너무 복잡하다.
  ```js
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

    const url = 'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko'

  request({ url: url, json: true }, (error, response) => {
    if(error) {
      console.log('Unable to connect to weather service')
    } else if(response.body.error) {
      console.log('Unable to find location')
    } else {
      const weatherInfo = response.body.currently
      console.log(`${response.body.daily.data[0].summary} It is currently ${weatherInfo.temperature} degrees out. There is a ${weatherInfo.precipProbability}% chance of rain.`)
    }
  })

  })
  ```
- 이렇기 때문에 콜백함수를 이용해 정리해서 도시와 경도 위도를 구할것
  ```js
    const geocode = (address, callback) => {
    // encodeURIComponent를 써주면 특수문자가 들어간 단어도 검색 가능해진다
    // 위도와 경도의 위치를 주의할것
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1`

    request({ url: url, json: true}, (error, response) => {
      if (error) {
        callback('Unable to connect to location services', undefined)
      } else if (response.body.features.length === 0) {
        callback('Unable to find location try another search', undefined)
      } else {
        callback(undefined, {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name
        })
      }
    })
  }

  geocode('Seoul', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

<!-- Data { latitude: 127,
  longitude: 37.58333,
  location: 'Seoul, South Korea' } -->
```
```
<h2 name="24">24. Callback Abstraction Challenge</h2>

### Challenge: Create a reusable function for getting the forecast
1. Setup the "forecast" function in utils/forecast.js
2. Require the function in app.js and call it as shown below
3. The forecast function should have three potential calls to callback:
   - Low level error, pass string for error
   - Coordinate error, pass string for error
   - Success, pass forecast string for data (same format as from before)
  ```js
    const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=us&lang=ko`

    request({ url: url, json: true}, (error, response) => {
      if(error) {
        callback('Unable to connect to weather service', undefined)
      } else if (response.body.error) {
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

    forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
  ```

<h2 name="25">25. Callback Chaining</h2>

- app.js 파일에서 장소의 정보와 날씨 정보 둘다 가지고있다. 
  ```js
    geocode('Incheon', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

  forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
  ```
- 하지만 두개의 정보는 따로 작동되는중 
- callback chaining 패턴을 이용해 두개의 정보를 연결시켜보자 
  ```js
    geocode('Incheon', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
    forecast(data.latitude, data.longitude, (error, data) => {
      console.log('Error', error)
      console.log('Data', data)
    })
  })
  ```
- 연결된 두개의 함수를 refactor 시켜주기
  ```js
    geocode('Incheon', (error, data) => {
    if(error) {
      return console.log(error)
    } 
    console.log('Error', error)
    console.log('Data', data)
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if(error) {
        return console.log(error)
      }
      console.log(data.location)
      console.log(forecastData)
    })
  })
  ```

### Challenge: Accept location via command line argument

1. Access the command line argument without yargs (hint: second vid in section 3)
2. Use the string value as the input for geocode
3. Only geocode if a location was provided
  ```js
  const address = process.argv[2]

  if(!address) {
    console.log('Plase provide an address')
  } else {
    geocode(address, (error, data) => {
      if(error) {
        return console.log(error)
      } 
      console.log('Error', error)
      console.log('Data', data)
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if(error) {
          return console.log(error)
        }
        console.log(data.location)
        console.log(forecastData)
      })
    })
  }
  ```
4. Test your work with a couple location
  ```js
  // $ node app.js Seoul
  ```

<h2 name="26">26. Destructuring and Property Shorthand Challenge</h2>

### Challenge: Use both destructuring and property shorthand in weather app

1. Use destructuring in app.js, forcast.js and geocode.js
  ```js
  // app.js
  if(!address) {
  console.log('Plase provide an address')
  } else {
    geocode(address, (error, {latitude, longitude, location}) => {
      if(error) {
        return console.log(error)
      } 
      forecast(latitude, longitude, (error, forecastData) => {
        if(error) {
          return console.log(error)
        }
        console.log(location)
        console.log(forecastData)
      })
    })
  }

  // forecast.js
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

  // geocode.js
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
  ```
2. Use property shorthand in forecast.js and geocode.js
3. Test your work and ensure app still works

<h2 name="27">27. HTTP Requests without a library</h2>

- request 라이브러리 없이 노드js를 이용해 http 요청을 보내고 받은 데이터를 파싱하기
- 노드js의 HTTPS 모듈을 사용할것임
  ```js
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
  ```

<h2 name="28">28. Hello Express!</h2>

  ```js
  const app = express()
  ```
- express()를 통해서 express의 다양한 메소드들을 사용할 수 있다.
  
  ```js
    app.get('', (req, res) => {
      res.send('hello express!')
  })
  ```
- .get은 사용자들에게 다양한 라우트를 사용 가능하게 만들어주는 메소드이며 두개의 인자를 받는다. 하나는 라우트의 이름과 다른 하나는 해당 라우트를 방문했을때 실행시켜주는 콜백함수
- 콜백함수는 두개의 인자를 받는데 하나는 요청이 담긴 객체(req)와 서버로부터 받은 응답객체(res)이다. 
- send 메서드를 이용해 브라우저 화면에 'hello express' 렌더링 가능

  ```js
    app.listen(3000, () => {
    console.log('Server is up on port 3000')
  })
  ```
- localhost:3000에서 내용을 확인 할 수 있다. 
- app.get을 이용해 새로운 페이지 생성가능
  ```js
  app.get('/help', (req, res) => {
    res.send('Help page')
  })
  ```
- 단 새로운 페이지를 만들경우 서버를 다시 시작해야한다. (nodemon 사용가능)

### Challenge: Setup two new routes

1. Setup an about route and render a page title
  ```js
  app.get('/about', (req, res) => {
    res.send('About page')
  })
  ```
2. Setup a weather route and render a page title
  ```js
  app.get('/weather', (req, res) => {
    res.send('Weather page')
  })
  ```
3. Test your work by visiting both in the browser

<h2 name="29">29. Serving up HTML and JSON</h2>

- express로 html 요청보내기
  ```js
  app.get('', (req, res) => {
    res.send('<h1>hello express!</h1>')
  })
  ```
- express로 JSON 요청보내기
  ```js
  app.get('/help', (req, res) => {
    res.send({
        name: 'Jae Hyun',
        gender: 'male'
      })
    })
  ```
- 배열로도 가능
  ```js
  app.get('/help', (req, res) => {
    res.send([{
      name: 'Jae Hyun',
      gender: 'male'
    }, {
      name: 'Hyun Jae',
      gender: 'male'
    }])
  })
  ```
### Challenge: Update routes
1. Setup about route to render a title with HTML
  ```js
  app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
  })
  ```
2. Setup a weather route to send back JSON
    - Object with forecast and location strings
  ```js
  app.get('/weather', (req, res) => {
    res.send({
      location: 'Incheon',
      forecast: 'clear sky'
    })
  })
  ```
3. Test your work by visiting both in the browser

<h2 name="30">30. Serving up Static Assets</h2>

- express를 이용해서 서버에 html, css, js파일등을 제공해볼것임
- 먼저 index.html 파일을 생성
- app.js 파일에서...
  ```js
  const path = require('path')

  const publicDirectoryPath = path.join(__dirname, '../public')
  // C:\Users\AJH\Documents\udemy\The-Complete-Node.js-Developer-Course\web-server\public

  // 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용
  app.use(express.static(publicDirectoryPath))  
  ```

<h2 name="31">31. Serving up CSS, JS, Images and more</h2>

- express에서 보여지는 html 파일에 이미지와 자바스크립트를 붙이면 됨 

<h2 name="32">32. Dynamic Pages with Templating</h2>

- 핸들바 라이브러리를 사용할것
- 핸들바를 사용하게되면 동적인 컨텐츠를 렌더링 할 수 있으며 재사용이 가능한 코드를 만들 수 있다. 
- npm에서 hbs를 다운받아 app.js 파일에서 express에 셋팅해주기
  ```js
  app.set('view engine', 'hbs')
  ```
- views라는 폴더를 생성하고 index.hbs를 생성한뒤에 index.html에 있던 내용들을 붙이기
- app.js 파일과 같은 루트에 views 폴더 넣어주기
- index.html 삭제
- app.js에 셋팅해주기
  ```js
  app.get('루트 들어가는 자리',(req, res) => {
    res.render('index')
  })
  ```
- res.render를 호출하게 되면 express는 view를 가져오고 html 파일로 전환 
- 이제 index.hbs에 있는 내용들을 동적으로 바꿔보자
  ```js
  app.get('루트 들어가는 자리',(req, res) => {
    res.render('index', {
      title: 'Weather App',
      name: 'Jae Hyun'
    })
  })
  ```
- index.hbs 파일에서는 이렇게 받는다
  ```js
  <body>
    <h1>{{title}}</h1>
    <p>Created by {{name}}</p>
  </body>
  ```

<h2 name="33">33. Customizing the Views Directory</h2>

- hbs 파일이 들어있는 폴더의 이름을 views가 아닌 다른 이름으로 하게되면 에러가 난다 (views는 express의 디폴트 장소임)
- 하지만 views가 아닌 다른 이름을 디폴트 장소로 만들 수 있다. 
  ```js
  const viewsPath = path.join(__dirname, './templates') // 강의영상이랑 루트가 다르다
  app.set('views', viewsPath)
- 더 자세한 내용은 express 문서에서 확인이 가능 (http://expressjs.com/en/4x/api.html#app)