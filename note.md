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
- [34. 템플릿 설정](#34)
- [35. 에러페이지 만들기](#35)
- [36. 쿼리 스트링 인식하기](#36)
- [37. geocode와 forecast JSON HTTP Endpoint에 연결시키기](#37)
- [38. Fetch를 이용해 HTTP Requests 보내기](#38)
- [39. 날씨 검색 폼 만들어 주기](#39)
- [40. 검색정보 화면에 렌더링해주기](#40)
- [41. 몽고DB](#41)
- [42. 몽고DB 설치하기](#42)
- [43. Robo 3T 설치하기](#43)
- [44. 몽고DB에 데이터 넣어주기](#44)
- [45. 몽고DB에 다큐먼트 넣어주기](#45)
- [46. ObjectID 생성 및 활용하기](#46)
- [47. 필요한 다큐먼트 찾기](#47)
- [48. 다큐먼트 수정](#48)
- [49. 다큐먼트 삭제](#49)

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
  }
});
```

2. Create and export a removeNote function from notes.js

```js
module.exports = {
  getNotes,
  addNote,
  removeNote
};
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
  handler: argv => notes.removeNote(argv.title)
});
```

4. Have removeNote log the title of the note to be removed

```js
const removeNote = title => {
  console.log(title);
};
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
const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);
  saveNotes(newNotes);
};
```

### Challenge 3 : Use chalk to provide useful logs for remove

1. If a note is removed, print 'Nice removed!' with a grenn background
2. If no note is removed, print 'No note found!' with a red background

```js
const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);
  saveNotes(newNotes);
  if (notes.length > newNotes.length) {
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};
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
});

// notes.js
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgCyan('Your notes'));
  notes.forEach(note => console.log(note.title));
};

module.exports = {
  getNotes,
  addNote,
  removeNotes,
  listNotes
};

// $ node app.js list
```

<h2 name="16">16. Reading a Note</h2>

- 기존 addNote같은경우 filter 메서드를 사용해서 새로운 배열을 생성할 수도 있으나 문제는 filter 메서드의 경우 모든 리스트를 검색한다는것에 있다.
- 예를들어 천개의 타이틀 리스트중 중간에 있는 특정 타이틀을 찾기위해 filter 메서드를 사용하게 된다면 중간 검색도중 원하는 타이틀을 찾았음에도 불구하고 멈추지 않고 끝까지 모든 타이틀을 검색한다.

  ```js
  const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);

    if (!duplicateNotes.length) {
      notes.push({
        title,
        body
      });
      saveNotes(notes);
      console.log(chalk.bgGreen('New note added!'));
    } else {
      console.log(chalk.bgRed('Note title taken!'));
    }
  };
  ```

- 때문에 filter 대신 find 메서드를 사용할것

  ```js
  const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
      notes.push({
        title,
        body
      });
      saveNotes(notes);
      console.log(chalk.bgGreen('New note added!'));
    } else {
      console.log(chalk.bgRed('Note title taken!'));
    }
  };
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
  handler: argv => notes.readNote(argv.title)
});
```

2. Create readNote in notes.js

- Search for note by title
- Find note and print title (styled) and body (plain)
- No note found? Print error in red

```js
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};
```

3. Have the command handler call the function

```js
module.exports = {
  getNotes,
  addNote,
  removeNotes,
  listNotes,
  readNote
};
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
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    debugger;

    if (!duplicateNote) {
      notes.push({
        title,
        body
      });
      saveNotes(notes);
      console.log(chalk.bgGreen('New note added!'));
    } else {
      console.log(chalk.bgRed('Note title taken!'));
    }
  };

  // $ node inspect app.js --title="Courses" --body="Node.js"
  // chrome://inspect/#devices에서 debugger가 표시되어있는 라인까지의 내용을 Remote Target에서 확인 할 수 있다.
  ```

<h2 name="18">18. Asynchronous Basics</h2>

```js
console.log('Starting');

setTimeout(() => {
  console.log('2 Second Timer');
}, 2000);

setTimeout(() => {
  console.log('0 Second Timer');
}, 0);

console.log('Stopping');

// $ node app.js
// Starting
// Stopping
// 0 Second Timer
// 2 Second Timer
```

<h2 name="19">19. Customizing HTTP Requests</h2>

- request 라이브러리와 darksky api를 사용해 날씨앱 만들기

  ```js
  const request = require('request');

  const url =
    'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233';

  // json: true는 url에서 받은 데이터를 객체로 파싱해준다
  request({ url: url, json: true }, (error, response) => {
    console.log(response.body.currently);
  });
  ```

### Challenge: Print a small forecast to the user

1. Print: 'It is currently 58.55 degrees out. There is a 0% change of rain.'
2. Test your work

```js
request({ url: url, json: true }, (error, response) => {
  const weatherInfo = response.body.currently;
  console.log(
    `It is currently ${weatherInfo.temperature} degrees out. There is a ${
      weatherInfo.precipProbability
    } chance of rain.`
  );
});
```

- 뒤에 옵션을 더 붙여줌으로써 원하는 정보를 추가적으로 얻을 수 있다.

  ```js
  const url =
    'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko';

  request({ url: url, json: true }, (error, response) => {
    const weatherInfo = response.body.currently;
    console.log(
      `${response.body.daily.data[0].summary} It is currently ${
        weatherInfo.temperature
      } degrees out. There is a ${
        weatherInfo.precipProbability
      }% chance of rain.`
    );
  });

  // 저녁에 약간 흐림 시작 It is currently 50.3 degrees out. There is a 0% chance of rain.
  ```

<h2 name="20">20. An HTTP Request Challenge</h2>

- Geocoding api를 이용해 받은 위도 / 경도 정보를 날씨앱에 전달해 원하는 장소의 날씨를 찾아볼 것임

### Challenge: Print the lat/long for Los Angeles

1. First off a new request to the URL explored in browser
2. Have the request module parse it as JSON

```js
const url2 =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1';

request({ url: url2, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];
  console.log(latitude, longitude);
});
```

3. Print both the latitude and longitude to the terminal

````js
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
````

### Challenge: Handle errors for geocodiing request

1. Setup an error handler for low-level errors
2. Test by disabling network request and running the app
3. Setup error handling for no matching results

```js
const url2 =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1';

request({ url: url2, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to location service');
  } else if (response.body.features.length === 0) {
    console.log('Unable to find location try another search');
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude, longitude);
  }
});
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
    callback(num1 + num2);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum); // 5
});
```

4. Test your work

<h2 name="23">23. Callback Abstraction</h2>

- 이번에는 함수안에서 http 요청을 하는 진짜 함수를 만들어볼것임
- darksky api에서 받은 위도와 경도값을 geoCoding 함수에 넣어줬지만 함수가 너무 복잡하다.

  ```js
  const url2 =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1';

  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      console.log('Unable to connect to location service');
    } else if (response.body.features.length === 0) {
      console.log('Unable to find location try another search');
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      console.log(latitude, longitude);
    }

    const url =
      'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/37.8267,-122.4233?units=us&lang=ko';

    request({ url: url, json: true }, (error, response) => {
      if (error) {
        console.log('Unable to connect to weather service');
      } else if (response.body.error) {
        console.log('Unable to find location');
      } else {
        const weatherInfo = response.body.currently;
        console.log(
          `${response.body.daily.data[0].summary} It is currently ${
            weatherInfo.temperature
          } degrees out. There is a ${
            weatherInfo.precipProbability
          }% chance of rain.`
        );
      }
    });
  });
  ```

- 이렇기 때문에 콜백함수를 이용해 정리해서 도시와 경도 위도를 구할것

  ```js
  const geocode = (address, callback) => {
    // encodeURIComponent를 써주면 특수문자가 들어간 단어도 검색 가능해진다
    // 위도와 경도의 위치를 주의할것
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1`;

    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback('Unable to connect to location services', undefined);
      } else if (response.body.features.length === 0) {
        callback('Unable to find location try another search', undefined);
      } else {
        callback(undefined, {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name
        });
      }
    });
  };

  geocode('Seoul', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
  });
  ```

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
  const url = `https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}?units=us&lang=ko`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        summary: response.body.daily.data[0].summary,
        temperature: response.body.currently.temperature,
        precipProbability: response.body.currently.precipProbability
      });
    }
  });
};

forecast(-75.7088, 44.1545, (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});
```

<h2 name="25">25. Callback Chaining</h2>

- app.js 파일에서 장소의 정보와 날씨 정보 둘다 가지고있다.

  ```js
  geocode('Incheon', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
  });

  forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
  });
  ```

- 하지만 두개의 정보는 따로 작동되는중
- callback chaining 패턴을 이용해 두개의 정보를 연결시켜보자
  ```js
  geocode('Incheon', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
    forecast(data.latitude, data.longitude, (error, data) => {
      console.log('Error', error);
      console.log('Data', data);
    });
  });
  ```
- 연결된 두개의 함수를 refactor 시켜주기
  ```js
  geocode('Incheon', (error, data) => {
    if (error) {
      return console.log(error);
    }
    console.log('Error', error);
    console.log('Data', data);
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.location);
      console.log(forecastData);
    });
  });
  ```

### Challenge: Accept location via command line argument

1. Access the command line argument without yargs (hint: second vid in section 3)
2. Use the string value as the input for geocode
3. Only geocode if a location was provided

```js
const address = process.argv[2];

if (!address) {
  console.log('Plase provide an address');
} else {
  geocode(address, (error, data) => {
    if (error) {
      return console.log(error);
    }
    console.log('Error', error);
    console.log('Data', data);
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.location);
      console.log(forecastData);
    });
  });
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
if (!address) {
  console.log('Plase provide an address');
} else {
  geocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}

// forecast.js
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}?units=us&lang=ko`;

  request({ url, json: true }, (error, response) => {
    const { temperature, precipProbability } = response.body.currently;
    const { summary } = response.body.daily.data[0];
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        summary,
        temperature,
        precipProbability
      });
    }
  });
};

// geocode.js
const geocode = (address, callback) => {
  // encodeURIComponent를 써주면 특수문자가 들어간 단어도 검색 가능해진다
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ29vbmdhbWphIiwiYSI6ImNqdjF6NjAwdzF6dXAzeXMwNTFsZmR6aDAifQ.LP4Fr2wam10Oa4NZp1RrAw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    const { center, place_name } = body.features[0];
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location try another search', undefined);
    } else {
      callback(undefined, {
        latitude: center[0],
        longitude: center[1],
        location: place_name
      });
    }
  });
};
```

2. Use property shorthand in forecast.js and geocode.js
3. Test your work and ensure app still works

<h2 name="27">27. HTTP Requests without a library</h2>

- request 라이브러리 없이 노드js를 이용해 http 요청을 보내고 받은 데이터를 파싱하기
- 노드js의 HTTPS 모듈을 사용할것임

  ```js
  const https = require('https');
  const url =
    'https://api.darksky.net/forecast/ead5a6070fa3453c83598e172962f096/40, -75';

  const request = https.request(url, res => {
    let data = '';

    res.on('data', chunk => {
      data = data + chunk.toString();
      console.log(chunk);
    });

    res.on('end', () => {
      const body = JSON.parse(data);
      console.log(body);
    });

    request.on('error', error => {
      console.log('An error', error);
    });
  });

  request.end();
  ```

<h2 name="28">28. Hello Express!</h2>

```js
const app = express();
```

- express()를 통해서 express의 다양한 메소드들을 사용할 수 있다.

  ```js
  app.get('', (req, res) => {
    res.send('hello express!');
  });
  ```
- .get은 사용자들에게 다양한 라우트를 사용 가능하게 만들어주는 메소드이며 두개의 인자를 받는다. 하나는 라우트의 이름과 다른 하나는 해당 라우트를 방문했을때 실행시켜주는 콜백함수
- 콜백함수는 두개의 인자를 받는데 하나는 요청이 담긴 객체(req)와 서버로부터 받은 응답객체(res)이다.
- send 메서드를 이용해 브라우저 화면에 'hello express' 렌더링 가능
- res.send() allows us to send something back to the requester

  ```js
  app.listen(3000, () => {
    console.log('Server is up on port 3000');
  });
  ```
- app.listen은 서버를 실행시킨다.
- localhost:3000에서 내용을 확인 할 수 있다.
- app.get을 이용해 새로운 페이지 생성가능
  ```js
  app.get('/help', (req, res) => {
    res.send('Help page');
  });
  ```
- 단 새로운 페이지를 만들경우 서버를 다시 시작해야한다. (nodemon 사용가능)

### Challenge: Setup two new routes

1. Setup an about route and render a page title

```js
app.get('/about', (req, res) => {
  res.send('About page');
});
```

2. Setup a weather route and render a page title

```js
app.get('/weather', (req, res) => {
  res.send('Weather page');
});
```

3. Test your work by visiting both in the browser

<h2 name="29">29. Serving up HTML and JSON</h2>

- express로 html 요청보내기
  ```js
  app.get('', (req, res) => {
    res.send('<h1>hello express!</h1>');
  });
  ```
- express로 JSON 요청보내기
  ```js
  app.get('/help', (req, res) => {
    res.send({
      name: 'Jae Hyun',
      gender: 'male'
    });
  });
  ```
- 배열로도 가능
  ```js
  app.get('/help', (req, res) => {
    res.send([
      {
        name: 'Jae Hyun',
        gender: 'male'
      },
      {
        name: 'Hyun Jae',
        gender: 'male'
      }
    ]);
  });
  ```

### Challenge: Update routes

1. Setup about route to render a title with HTML

```js
app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>');
});
```

2. Setup a weather route to send back JSON
   - Object with forecast and location strings

```js
app.get('/weather', (req, res) => {
  res.send({
    location: 'Incheon',
    forecast: 'clear sky'
  });
});
```

3. Test your work by visiting both in the browser

<h2 name="30">30. Serving up Static Assets</h2>

- express를 이용해서 서버에 html, css, js파일등을 제공해볼것임
- 먼저 index.html 파일을 생성
- app.js 파일에서...

  ```js
  const path = require('path');

  const publicDirectoryPath = path.join(__dirname, '../public');
  // C:\Users\AJH\Documents\udemy\The-Complete-Node.js-Developer-Course\web-server\public

  // 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 express.static을 사용
  app.use(express.static(publicDirectoryPath));
  ```

<h2 name="31">31. Serving up CSS, JS, Images and more</h2>

- express에서 보여지는 html 파일에 이미지와 자바스크립트를 붙이면 됨

<h2 name="32">32. Dynamic Pages with Templating</h2>

- 핸들바 라이브러리를 사용할것
- 핸들바를 사용하게되면 동적인 컨텐츠를 렌더링 할 수 있으며 재사용이 가능한 코드를 만들 수 있다.
- npm에서 hbs를 다운받아 app.js 파일에서 express에 셋팅해주기
  ```js
  app.set('view engine', 'hbs');
  ```
- views라는 폴더를 생성하고 index.hbs를 생성한뒤에 index.html에 있던 내용들을 붙이기
- app.js 파일과 같은 루트에 views 폴더 넣어주기
- index.html 삭제
- app.js에 셋팅해주기
  ```js
  app.get('루트 들어가는 자리', (req, res) => {
    res.render('index');
  });
  ```
- res.render를 호출하게 되면 express는 view를 가져오고 html 파일로 전환
- 이제 index.hbs에 있는 내용들을 동적으로 바꿔보자
  ```js
  app.get('루트 들어가는 자리', (req, res) => {
    res.render('index', {
      title: 'Weather App',
      name: 'Jae Hyun'
    });
  });
  ```
- index.hbs 파일에서는 이렇게 받는다
  ```js
  <body>
    <h1>{{ title }}</h1>
    <p>Created by {{ name }}</p>
  </body>
  ```

<h2 name="33">33. Customizing the Views Directory</h2>

- hbs 파일이 들어있는 폴더의 이름을 views가 아닌 다른 이름으로 하게되면 에러가 난다 (views는 express의 디폴트 장소임)
- 하지만 views가 아닌 다른 이름을 디폴트 장소로 만들 수 있다.
  ```js
  const viewsPath = path.join(__dirname, './templates'); // 강의영상이랑 루트가 다르다
  app.set('views', viewsPath);
  ```
- 더 자세한 내용은 express 문서에서 확인이 가능 (http://expressjs.com/en/4x/api.html#app)

<h2 name="34">34. Advanced Templating</h2>

- 어디에서든 재사용 될 수 있는 템플릿들을 만들어보자 (헤더, 푸터 등)
- app.js파일에 hbs 가져오기
  ```js
  const hbs = require('hbs');
  ```
- templates 폴더에 partials와 views 폴더를 생성한 뒤에 기존에 있던 파일들(about, help, index)을 views 폴더에 넣는다.
- app.js의 viewsPath의 경로 바꿔주고 partials폴더 경로 생성해주기
  ```js
  const viewsPath = path.join(__dirname, './templates/views');
  const partialsPath = path.join(__dirname, './templates/partials');
  ```
- 어디서든 재사용 될 수 있는 템플릿을 만들기 위해 partials 폴더를 셋팅해준다.
  ```js
  hbs.registerPartials(partialsPath);
  ```
- partials 폴더 안에 header.hbs를 만들고 작성한 뒤
  ```js
  <h1>Static Header.hbs Text</h1>
  ```
- help.hbs를 작성
  ```js
  <body>
    {{>header}}
    <h1>{{title}}</h1>
    <p>{{helpmessage}}</p>
  </body>
  ```
- 하지만 nodemon은 js 파일만 감지하기때문에 에러가 발생한다.
  ```js
  The partial header could not be found
  ```
- 그러므로 nodemon을 js 파일과 hbs 파일이 변할때 감지하도록 커스터마이징 해줘야 한다.
  ```js
  // $ nodemon app.js -e js,hbs
  ```
- header.hbs에 title을 만들고 링크를 만들어주게 되면 각 페이지마다 공통적으로 app.js에서 받은 각 페이지의 타이틀과 다른 페이지로 갈 수 있는 링크들이 보여지게 된다.
  ```js
  <h1>{{title}}</h1>
  <div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
  </div>
  ```

### Challenge: Create a partial for the footer

1. Setup the template for the footer partial "Created by Some Name"

- partials 폴더에 footer.hbs를 생성한뒤 내용을 적는다

2. Render the partial at the bottom of all three pages

- views 폴더에 있는 각각의 hbs 파일에 footer를 넣어준다

```js
{{>footer}}
```

3. Test your work by visiting all three pages

<h2 name="35">35. 404 Pages</h2>

- 유저가 만들어지지 않은 페이지로 이동 할 경우 보여줄 404페이지를 만들어볼것임
  ```js
  // app.js
  // *의 뜻 -> 그동안 매치 안된 url을 매치시킨다는것
  // 라우트는 작성된 순서대로 작동. 에러 라우트는 마지막에 셋업되어야 한다.
  app.get('*', (req, res) => {
    res.send('My 404 page');
  });
  ```
- 이것은 또한 이렇게 사용가능

  ```js
  app.get('/help/*', (req, res) => {
    res.send('Help article not found');
  });

  // localhost:3000/help/helpMe -> Help article not found
  ```

### Challenge: Create and render a 404 page with handlebars

1. Setup the template to render the header and footer

```js
// 404.hbs
<body>
  {{>header}}
    <p>{{errorMessage}}</p>
  {{>footer}}
</body>
```

2. Setup the template to render an error message in a paragraph
3. Render the template for both 404 routes

- Page not found.
- Help article not found

```js
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jae Hyun',
    errorMessage: 'Page not found'
  });
});
```

4. Test your work. Visit /what and /help/units

- 정리하자면 공통으로 쓰이는 파트들은 partials라는 폴더에 따로 넣어서 app.js에서 만든 res.render 함수에서 객체의 프로퍼티값을 받아서 사용하는것
- 주의할 점은 res.render안에 쓰일 파일명은 views에 있는 파일의 이름과 같아야 한다.
- 화면에 렌더링 되야할 필요한 정보들은 app.js로부터 나와 필요에 따라 views와 partials에 있는 파일에 쓰인다.

<h2 name="36">36. The Query String</h2>

- 요청되는 쿼리 스트링 확인하기

  ```js
  app.get('/products', (req, res) => {
    if (!req.query.search) {
      res.send({
        error: 'You must provide a search term'
      });
    }

    console.log(req.query.search); // games
    res.send({
      products: []
    });
  });

  // http://localhost:3000/products?search=games&rating=5 요청을 보내게 되면
  // 콘솔에 { search: 'games', rating: '5'} 값이 나오게 된다.
  ```

- 하지만 요청을 보내면
  ```js
  Cannot set headers after they are sent to the client
  ```
  라는 에러가 발생
- 리퀘스트를 두번 보내게 될 때 발생되는 에러이다.
- 그러므로 if문 안에 있는 res.send에 return을 붙여서 코드작동이 멈추도록 해야한다.

  ```js
  app.get('/products', (req, res) => {
    if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term'
      });
    }

    console.log(req.query.search); // games
    res.send({
      products: []
    });
  });
  ```

### Challenge: Update weather endpoint to accept address

1. No address? Send back an error message
2. Address? Send back the static JSON

- Add address property onto JSON which returns the provided address

```js
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  console.log(req.query.address);
  res.send({
    forecast: 'clear sky',
    location: 'Incheon',
    address: req.query.address
  });
});
```

3. Test /weather and /weather?address=Incheon

<h2 name="37">37. Building a JSON HTTP Endpoint</h2>

### Challenge: Wire up /weather

1. Require geocode/forecast into app.js
2. Use the address to geocode
3. Use the coordinates to get forecast

```js
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
      if (error) {
        return console.log(error);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    });
  }
});
```

4. Send back the real forecast and location

<h2 name="38">38. Browser HTTP Requests with Fetch</h2>

- 클라이언트 사이드에서 데이터 요청보내기 위해 src 폴더안의 views 폴더안에 있는 index.hbs와 연결되어있는 app.js 파일을 사용할것
- app.js 파일안에 fetch api를 사용해서 데이터를 가져올것임

### Challenge: Fetch weather!

1. Setup a call to fetch weather for your city
2. Get the parse JSON response
   - If error property, print error
   - If no error property, print location and forecast
3. Refresh the browser and test your work
   ```js
   fetch('http://localhost:3000/weather?address=incheon').then(res => {
     res.json().then(data => {
       if (data.error) {
         console.log('error occured!');
       } else {
         console.log(data.address);
         console.log(data.forecast);
       }
     });
   });
   ```
<h2 name="39">39. Creating a Search Form</h2>

- 메인 index.hbs에서 날씨 검색을 할 수 있는 검색창을 만들어 주기 위해 form을 사용할것임

  ```js
  <div class="main-content">
    {{>header}}
    <p>Use this site to get your weather</p>
    <form>
      <input placeholder="Location">
      <button>Search</button>
    </form>
  </div>
  {{>footer}}
  ```

- 다음 form과 input창을 querySelector로 연결시키고
  ```js
  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');
  ```
- form이 어떻게 사용되어야 할 지 만들어준다

  ```js
  weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    // location안에는 사용자가 폼에 입력한 뒤 submit한 단어가 들어있다
    console.log(location);
  });
  ```
### Challenge: Use input value to get weather

1. Migrate fetch call into the submit callback
2. Use the search text as the address query string value
  ```js
  weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
      res.json().then(data => {
        if (data.error) {
          console.log('error occured!');
        } else {
          console.log(data.address);
          console.log(data.forecast);
        }
      });
    });
  });
  ```
3. Submit the form with a valid and invalid value to test

<h2 name="40">40. Wiring up the User Interface</h2>

- 그동안 console.log를 통해 나왔던 메세지들을 화면에 출력하게 만들것.
- index.hbs에서 p 태그를 두개 만든 뒤, 하나는 에러가 날 경우 또 다른 하나는 데이터를 받아왔을 때의 경우 화면에 표시하게 만들것.
- 구분을 위해 각각 고유의 id를 갖게 만든다.
  ```js
  <div class="main-content">
    {{>header}}
    <p>Use this site to get your weather</p>
    <form>
      <input placeholder="Location">
      <button>Search</button>
    </form>

    <p id="message-1"></p>
    <p id="message-2"></p>
  </div>
  ```
- app.js에서 p 태그들을 인식할 수 있게 querySelector를 써준다.
  ```js
  const messageOne = document.querySelector('#message-1')
  const messageTwo = document.querySelector('#message-2')
  ```

### Challenge: Render content to paragraphs

1. Select the second message p from JS
2. Just before fetch, render loading message and empty p
3. If error, render error
4. If no error, render location and forecast
5. Test your work! Search for errors and for valid locations
  ```js
  weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    messageTwo.textContent = 'LOADING...'

    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
      res.json().then(data => {
        if (!data) {
          messageOne.textContent = 'error occured!' // error는 작동하지 않는다(버그)
        } else {
          const {summary, temperature} = data.forecast
          messageOne.textContent = data.location
          messageTwo.textContent = `날씨: ${summary}, 온도: ${temperature}`
        }
      });
    });
  });
  ```
<h2 name="41">41. MongoDB and NoSQL Databases</h2>

- 몽고DB를 이용해서 유저 데이터를 저장해보자
- 몽고DB는 NoSQL
- SQL은 테이블로 데이터를 정리하는 반면에 NoSQL은 컬랙션으로 데이터를 정리한다. (컬랙션은 JSON형태)
- note-img 폴더의 SQLvsNoSQL 이미지 참조

<h2 name="42">42. Installing MongoDB on Windows</h2>

- 몽고DB 압축 파일을 받은 뒤 압축 파일 안에 있는 내용들을 로컬 디스크의 사용자 폴더에 넣어준다. 
- 몽고DB 폴더와 함께 몽고DB의 데이터를 저장할 mongoDB-data 폴더를 만들어 준다. 
- cmd를 사용해 mongoDB 폴더가 위치해 있는 폴더의 bin 폴더에서 해당 커맨드를 실행시킨다. 
  ```js
  mongod.exe --dbpath=/Users/AJH/mongoDB-data
  ```
- 해당 커맨드를 실행시키면 이런 결과가 나온다.
  ```js
  2019-05-21T15:10:14.539+0900 I NETWORK  [initandlisten] waiting for connections on port 27017
  2019-05-21T15:10:14.539+0900 I STORAGE  [LogicalSessionCacheRefresh] createCollection: config.system.sessions with generated UUID: 5b61136f-4797-4a39-98a4-758ddedc906c
  2019-05-21T15:10:14.551+0900 I INDEX    [LogicalSessionCacheRefresh] build index on: config.system.sessions properties: { v: 2, key: { lastUse: 1 }, name: "lsidTTLIndex", ns: "config.system.sessions", expireAfterSeconds: 1800 }
  2019-05-21T15:10:14.551+0900 I INDEX    [LogicalSessionCacheRefresh]     building index using bulk method; build may temporarily use up to 500 megabytes of RAM
  2019-05-21T15:10:14.554+0900 I INDEX    [LogicalSessionCacheRefresh] build index done.  scanned 0 total records. 0 secs
  ```
- port 27017은 mongoDB의 디폴트 포트다. 즉 서버가 포트번호 27017에서 실행되고 있다는 뜻이며 연결을 기다리고 있다는 뜻이다. 

<h2 name="43">43. Installing Database GUI Viewer</h2>

- MongoDB의 사용을 더욱 편하게 해주는 Robo 3T를 설치할 것.
- https://robomongo.org/
- 자세한 설치법은 인강에서 

<h2 name="44">44. Connecting and Inserting Documents</h2>

- Robo 3T를 이용해 데이터에 문서 넣어보기 
- MongoDB native driver 설치 및 사용하기 
- 새로운 폴더(task-manager) 생성한뒤 npm init 해주고 npm으로 mongodb 설치해주기
- MongoDB에 데이터 넣어주기
  ```js
  // CRUD
  // mongodb comes back as an object
  const mongodb = require('mongodb');
  // MongoClient gives us an access to a function necessary to connect to the database
  const MongoClient = mongodb.MongoClient;

  // There are all info we need to connect to our database
  const connectionURL = 'mongodb://127.0.0.1:27017';
  const databaseName = 'task-manager';

  // Let's connect to the server
  // useNewUrlParser: deprecate original url and set new url
  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      // stop the funtion execution
      return console.log('Unable to connect to database')
    }
    // client.db gets an argument that you want to manipulate 
    const db = client.db(databaseName)

    // insert a single document into a user's collection
    // it expects the name of collection you are trying to manipulate
    // insertOne expects an argument object that you want to insert
    db.collection('users').insertOne({
      name: 'Jae Hyun',
      gender: 'male'
    })
  });
  ```

<h2 name="45">45. Inserting Documents</h2>

- 데이터에 document 넣어주기
- insertOne 함수는 비동기 그러므로 insertOne 함수의 결과를 알기위해서는 콜백 함수를 사용 
  ```js
  db.collection('users').insertOne({
    name: 'Jae Hyun',
    gender: 'male'
  }, (error, result) => {
      if (error) {
        return console.log('Unable to insert user')
      }
      // ops는 데이터에 있는 모든 document를 가지고있다. 
      console.log(result.ops)
  })
    // 더 많은 정보는 http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne 여기서
    // $ node mongodb.js
  // [ { name: 'Jae Hyun', gender: 'male', _id: 5cec9bebae9d350bf454007b } ]
  ```
- users 데이터에 여러 document 넣는 방법
  ```js
    db.collection('users').insertMany([
      {
        name: 'Jen',
        gender: 'female'
      }, 
      {
        name: 'Gunther',
        gender: 'male'
      }
    ], (error, result) => {
      if (error) {
        return console.log('Unable to insert documents')
      }
      console.log(result.ops)
    })
  });
  ```
- Goal: Insert 3 tasks into a new tasks collection
  1. Use insertMany to insert three documents
    - description (string), completed (boolean)
  2. Setup the callback to handle error or print ops
  3. Run the script
  4. Refresh the database in Robo 3t and view data in tasks collection
  ```js
    db.collection('tasks').insertMany([
      {
        description: 'Wash dishes',
        completed: true
      }, 
      {
        description: 'Clean the house',
        completed: false
      },
      {
        description: 'Renew inspection',
        completed: true
      }
    ], (error, result) => {
      if(error) {
        return console.log('Unable to insert tasks')
      } 
      console.log(result.ops)
    })
  });
  ```

<h2 name="46">46. The ObjectID</h2>

- 몽고DB에서 ID는 GUID로 불린다.
- Globally Unique Identifiers
- 새로운 아이디 ID 생성하는 법
  ```js
  const ObjectID = mongodb.ObjectID;
  const id = new ObjectID();
  console.log(id) // 5cecb82f598b620338e33a43 (새로운 아이디 생성)
  console.log(id.getTimestamp()) // 2019-05-28T04:30:30.000Z
  ```
- ObjectID에 대한 설명 : https://docs.mongodb.com/manual/reference/method/ObjectId/
- 새로운 아이디를 몽고DB 데이터에 넣을 수 있다.
  ```js
  db.collection('users').insertOne({
    _id: id,
    name: 'Hyun-A',
    gender: 'female'
  }, (error, result) => {
      if (error) {
        return console.log('Unable to insert user')
      }
      console.log(result.ops)
      // [ { _id: 5cecb9ed13baeb1b0cb5bd9c,
      //  name: 'Hyun-A',
      //  gender: 'female' } ]
  })
  ```

<h2 name="47">47. Querying Documents</h2>

- 데이터에서 이름값이 Jen인 document 찾기
  ```js
  db.collection('users').findOne({ name:'Jen' }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch')
    }
    console.log(user)
    // { _id: 5cecb1095eb4f429bce35fa3, name: 'Jen', gender: 'female' }
  })
  ```
- 만약 데이터에 없는 값을 찾는다면 null을 반환한다. 
- 아이디를 이용해 찾고싶다면...
  ```js
   db.collection('users').findOne({ _id: new ObjectID('5cec9bebae9d350bf454007b') }, (error, user) => {
    if (error) {
      return console.log('Unable to fetch')
    }

    console.log(user)
  })
  ```
- 데이터에서 gender: male인 document들을 배열 형태로 가져오고 싶을 때
  ```js
   db.collection('users').find({ gender: 'male'}).count((error, count) => {
    console.log(count)
  })
  // toArray 대신 count를 사용하면 document의 갯수를 가져온다
  ```
- Goal: Use find and findOne with tasks
  1.  Use findOne to fetch the last task by its id (print doc to console)
  2.  Use find to fetch all tasks that are not completed (print docs to console)
  3.  Test your work!
  ```js
  db.collection('tasks').findOne({_id: new ObjectID('5cecb4a86eb2b62f4419d58d')}, (error, task) => {
    console.log(task)
  })

  // { _id: 5cecb4a86eb2b62f4419d58d,
  // description: 'Renew inspection',
  // completed: true }

  db.collection('tasks').find({ completed: false}).toArray((error, task) => {
    console.log(task)
  })

  //[ { _id: 5cecb4a86eb2b62f4419d58c,
  //  description: 'Clean the house',
  //  completed: false } ]
  ```

<h2 name="48">48. Updating Documents</h2>

- 데이터안의 document 업데이트 하기
  ```js
     db.collection('users').updateOne({
    _id: new ObjectID('5cecb1095eb4f429bce35fa4')
  }, {
    $set: {
      name: 'Mike'
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

  // 해당 아이디를 가지고 있는 document의 이름값이 Gunther에서 Mike로 바뀜 
  // $set과 같은 연산자들은 https://docs.mongodb.com/manual/reference/operator/update/ 참조
  ```
- Goal: Use updateMany to complete all tasks
1. Check the documentation for updateMany
2. Setup the call with the query and the updates
3. Use promise methods to setup the success/error handlers
4. Test your work
  ```js
  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
  ```

<h2 name="49">49. Deleting Documents</h2>

- deleteOne과 deleteMany를 사용해 document를 삭제하기 
- 성별이 남자인 document를 삭제하기
  ```js
  db.collection('users').deleteMany({
    gender: 'male'
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
  ```
- Goal: Use deleteOne to remove a task
1. Grab the description for the task you want to remove
2. Setup the call with the query
3. Use promise methods to setup the success/error handlers
4. Test your work
  ```js
  db.collection('tasks').deleteOne({
    description: 'Wash dishes'
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
  ```