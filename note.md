## 14. Removing a Note

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

## 15. Listing Notes

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
## 16. Reading a Note

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

## 17. Debugging Node.js

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

## 18. Asynchronous Basics

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

## 19. Customizing HTTP Requests

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

## 20. An HTTP Request Challenge

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

## 21. Handling Errors

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

## 22. The Callback Function

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

## 23. Callback Abstraction

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
## 24. Callback Abstraction Challenge

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

## 25. Callback Chaining

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