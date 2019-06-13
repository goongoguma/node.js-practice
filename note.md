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
- [50. 몽구스 설치 및 사용하기](#50)
- [51. 몽구스로 모델 만들기](#51)
- [52. 몽구스로 validation 및 sanitization하기 1](#52)
- [53. 몽구스로 validation 및 sanitization하기 2](#53)
- [54. REST API 구조](#54)
- [55. post요청 보내기 1](#55)
- [56. post요청 보내기 2](#56)
- [57. get요청 보내기 1](#57)
- [58. get요청 보내기 2](#58)
- [59. Async/Await 사용](#59)
- [60. path요청 보내기 1](#60)
- [61. path요청 보내기 2](#61)
- [62. delete요청 보내기](#62)
- [63. 라우터 분류하기](#63)
- [64. 비밀번호 해시화 하기 1 - bcript 사용](#64)
- [65. 비밀번호 해시화 하기 2 - bcript 사용](#65)
- [66. 유저의 이메일과 비밀번호로 로그인 하기](#66)
- [67. 유저에게 보낼 토큰 만들기 - jsonwebtoken 사용](#67)
- [68. 로그인을 위한 인증토큰 만들기](#68)
- [69. 인증토큰을 배열에 넣어주기](#69)
- [70. 미들웨어로 인증토큰 제어해주기](#70)
- [71. 인증토큰 보내기 & 확인하기](#71)
- [72. 로그아웃 기능 만들어주기](#72)
- [73. 필요한 정보만 보여주기](#73)
- [74. 수정 및 삭제 기능에 토큰 인증하기](#74)

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
  console.log(id.getTimestamp()) // 2019-05-28T04:30:30.000Z (아이디가 만들어진 시간)
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
   db.collection('users').find({ gender: 'male'}).toArray((error, users) => {
    console.log(users)
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

<h2 name="50">50. Setting up Mongoose</h2>

- 몽고DB에서 CRUD를 사용하는 방법은 알지만 document의 유효성 판단이나 필드의 기대값 설정, 다른 유저가 모르는 private task 만들기 등은 몽구스를 사용한다. 
- npm i mongoose
- 몽구스는 몽고DB의 모듈을 사용하기 때문에 구조는 비슷하다.
  ```js
  const mongoose = require('mongoose');
  // 몽고DB의 connect 함수와 다르게 데이터의 이름을 url의 뒤에다가 붙인다. 
  mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    // useCreateIndex는 몽구스가 몽고DB와 일할때 인덱스를 생성함으로써 유저가 필요한 데이터의 인덱스에 빠르게 접근시킨다. 
    useCreateIndex: true
  });
  ```
- 몽구스의 모델 정의하기
  ```js
  // 첫번째 인수 : 모델 이름 설정 
  // 두번째 인수 : 모델 필드의 이름과 타입 설정 하지만 더 많은 설정들이 가능
  const User = mongoose.model('User', {
    name: {
      type: String
    },
    age: {
      type: Number
    }
  })
  ```
- 모델 인스턴스 만들기
  ```js
  const me = new User({
    name: 'Vladimir',
    age: 500
  })
  ```
- 모델 인스턴스를 데이터에 저장하기
  ```js
  me.save().then((me) => {
    console.log(me)
  }).catch((error) => {
    console.log('Error!', error)
  })
  ```
- 이렇게 실행을 하게되면...
  ```js
  $ node src/db/mongoose.js

  { _id: 5cede6239f02ce30740cb7f0,
    name: 'Vladimir',
    age: 500,
    // __v는 다큐먼트의 버전이라는 의미 
    __v: 0 }
  
  // Robo 3T에서 task-manager-api라는 데이터와 그 안에 인스턴스가 생성된 것을 확인 가능
  // 만약 age 필드를 숫자가 아닌 문자열로 넣었을 경우 validation 에러가 발생함
  ```

<h2 name="51">51. Creating a Mongoose Model</h2>

- Goal: Create a model for tasks

1. Define the model with description and completed fields
2. Create a new instance of the model
3. Save the model to the database
4. Test your work!
  ```js
  const Task = mongoose.model('tasks', {
    description: {
      type: String
    },
    completed: {
      type: Boolean
    }
  })
  const todo = new Task({
    description: '집청소하기',
    completed: false
  })
  todo.save().then(todo => {
    console.log(todo)
  }).catch(error =>
    console.log(error))
  ```

<h2 name="52">52. Data Validation and Sanitization 1</h2>

- 몽구스 모델을 정의할 때 더욱 많은 validation 옵션을 넣어줄 수도 있다.
  ```js
  const User = mongoose.model('User', {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    }
  })
  // required: true 속성을 가진 name 필드가 없으므로 ValidatorError: Path `name` is required. 에러가 콘솔창에 뜬다
  // 자세한 내용은 https://mongoosejs.com/docs/validation.html 
  ```
- Validation을 커스텀으로 만들어주기
  ```js
  const User = mongoose.model('User', {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          // 입력된 나이값이 0 이하면 validation 오류 발생 
          throw new Error('Age must be positive number')
        }
      }
    }
  })
  ```
- npm의 validator 라이브러리를 이용 할 수도 있음 
  ```js
  const validator = require('validator');

  const User = mongoose.model('User', {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be positive number')
        }
      }
    }
  })

  const me = new User({
    name: 'Mike',
    email: 'mike@googl'
  })
  // validation error occurs
  ```
- 데이터 sanitization
  ```js
  email: {
    type: String,
    required: true,
    // 빈칸 없애기
    trim: true, 
    // 모든 알파벳은 소문자로 자동설정
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    // 초기값 0
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive number')
      }
    }
  }
  ```

<h2 name="53">53. Data Validation and Sanitization 2</h2>

- Goal: Add a password field to User

1. Setup the field as a required string
2. Ensure the length is greater than 6
3. Trim the password
4. Ensure that password does not contain 'password'
5. Test your work!
  ```js
   password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Do not set password as a password')
      }
    }
  }

  const me = new User({
    name: '   Jen',
    email: 'JEN@GOOGLE.COM',
    password: 'qweq1221asvvb'
  })
  ```

- Goal: Add validation and sanitization to task

1. Trim the description and make it required
2. Make completed optional and default it to false
3. Test your work with and without errors

  ```js
  const Task = mongoose.model('tasks', {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false
    }
  })

  const todo = new Task({
    description: '    설거지하기',
    completed: true
  })

  todo.save().then(() => {
    console.log(todo)
  }).catch(error =>
    console.log(error))
  ```

<h2 name="54">54. Structuring a REST API</h2>

- THE REST API
- Representational State Transfer - Application Programming Interface
- The Task Resource -> Create: POST /tasks
                    -> Read: GET /tasks
                    -> Read: GET /tasks/:id
                    -> Update: PATCH /tasks/:id
                    -> Delete: DELETE /tasks/:id

<h2 name="55">55. Resource Creation Endpoints 1</h2>

- task-manager 안에 src 폴더를 만든 뒤 그 안에다가 index.js 파일 생성.
- package.json 파일에서 명령어 설정
- index.js 파일 안에서 기본적인 express 셋팅해주기
  ```js
  const express = require('express');

  const app = express();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log('Server is up on port' + port)
  })
  ```
- 포트 3000에 접속하면 Cannot GET /이 뜬다. 왜냐하면 라우터 셋팅을 안해주었기 때문
- 하지만 포스트를 만들것이기 때문에(create) app.post를 사용할 것.
  ```js
  app.post('/users', (req, res) => {
    res.send('testing!')
  })
  ```
- 포스트맨에서 POST 메소드를 이용해 localhost:3000/users에 요청을 보내면 testing!이 온다. 
- Body에서도 JSON형태로 아래처럼 요청을 보내도 답이온다.
  ```json
  {
    "name": "Jay",
    "email": "jay@example.com",
    "password": "qwerqwer"
  }
  ```
- 포스트맨에서 요청보낸 JSON을 확인해보자
  ```js
  // app.use(express.json())는 요청이 들어온 JSON 파일을 파싱하여 자동적으로 객체로 전환시킨다 
  app.use(express.json())

  app.post('/users', (req, res) => {
    // app.use에서 객체로 전환된 요청을 확인할 수 있다. 
    console.log(req.body) // { name: 'Jay', email: 'jay@example.com', password: 'qwerqwer' }
    res.send('testing!')
  })
  ```
- models라는 폴더를 만들고 user 파일을 만든 뒤, 몽고DB에 만들었던 users 모델들을 복붙
- index.js파일에서 user 모델을 import한 뒤에 app.post와 연결시켜주기
  ```js
  app.use(express.json())

  app.post('/users', (req, res) => {
    // import한 모델에 포스트맨에서 작성된 데이터값을 넣는다. 
    const user = new User(req.body)
    
    user.save().then(() => {
      res.send(user)
    }).catch((error) => {
      // status값을 400으로 설정
      // 꼭 res.send보다 먼저 나와야한다
      res.status(400).send(error)
    })
  })
  ```
- https://httpstatuses.com/ 에서 다양한 status code 확인가능

<h2 name="56">56. Resource Creation Endpoints 2</h2>

- Goal: Setup the task creation endpoint

1. Create a separate file for the task model (load it into index.js)
2. Create the task creation endpoint (handle success and error)
3. Test the endpoint from postman with good and bad data

  ```js
  // task.js
  const mongoose = require('mongoose');

  const Task = mongoose.model('tasks', {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false
    }
  })

  module.exports = Task
  ```
  ```js
  // index.js
  const Task = require('./models/task');

  app.post('/tasks', (req, res) => {

    const task = new Task(req.body);

    task.save().then(() => {
      res.status(201).send(task)
    }).catch((error) => {
      res.status(400).send(error)
    })
  })
  ```
  ```js
  // Postman
  {
    "description": "washing dishes"
  }

  // result
  {
    "completed": false,
    "_id": "5cef366a480bba1f9427ff90",
    "description": "washing dishes",
    "__v": 0
  }
  ```

<h2 name="57">57. Resource Reading Endpoints 1</h2>

- 몽고DB에서 했던것과 같이 몽구스를 이용해서 특정 속성을 DB에서 찾아 해당 데이터를 가져오거나 여러 데이터를 가져오는 것을 해볼것임
- https://mongoosejs.com/docs/queries.html
- find를 사용해서 전체 다큐먼트들 가져오기
  ```js
  app.get('/users', (req, res) => {
    User.find({}).then(users => {
      res.send(users)
    }).catch((error) => {
      res.send(error)
    })
  })
  ```
- findById를 사용해서 해당 아이디를 가지고 있는 다큐먼트 가져오기
  ```js
  app.get('/users/:id', (req, res) => {
    // params는 라우트 파라메터를 담고있다 
    const _id = req.params.id
    User.findById(_id).then(user => {
      if(!user) {
        return res.status(404).send()
      }
      res.send(user)
    }).catch(error => {
      res.status(500).send()
    })
  })
  ```

<h2 name="58">58. Resource Reading Endpoints 2</h2>

- Goal: Setup the task reading endpoints

1. Create an endpoint for fetching all tasks
2. Create an endpoint for fetching a task by its id
3. Setup new requests in Postman and test your work
  ```js
  app.get('/tasks', (req, res) => {
    Task.find({}).then(task => {
      res.send(task)
    }).catch(error => {
      res.status(500).send(error)
    })
  })

  app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then(task => {
      if(!task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch(error => {
      res.status(500).send()
    })
  })
  ```

<h2 name="59">Integrating Async/Await</h2>

- Async와 Await을 라우트에 사용해보자
  ```js
  app.post('/users', async (req, res) => {
    const user = new User(req.body);
     // user.save().then(() => {
    //   res.status(201).send(user)
    // }).catch((error) => {
    //   res.status(400).send(error)
    // })
    try {
      await user.save();
      res.status(201).send(user)
    } catch(error) {
      res.status(400).send(error)
    }
  })

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({})
      res.send(users);
    } catch(error) {
      res.status(500).send();
    }
  })

  app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    // User.findById(_id).then(user => {
    //   if(!user) {
    //     return res.status(404).send()
    //   }
    //   res.send(user)
    // }).catch(error => {
    //   res.status(500).send()
    // })
    try {
      const user = await User.findById(_id)

      if(!user) {
        return res.status(404).send()
      }
      res.send(user)
    } catch(error) {
      res.status(500).send();
    }
  })
  ```
- Goal: Refactor task routes to use async/await

1. Refactor task routes to use async/await
2. Test all routes in Postman
  ```js
  app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
      await task.save();
      res.status(201).send(task)
    } catch(error) {
      res.status(400).send(error);
    }
  })

  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({})
      res.send(tasks);
    } catch(error) {
      res.status(500).send();
    }
  })

  app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
      const task = await Task.findById(_id);
      if(!task) {
      return res.status(404).send()
      }
      res.send(task)
    } catch(error) {
      res.status(500).send();
    }
  })
  ```

<h2 name="60">60. Resource Updating Endpoints 1</h2>

- patch 메소드 사용하기
  ```js
  app.patch('/users/:id', async(req, res) => {
      const _id = req.params.id
      try {
        // new: true is going to return a new user as oppose to the existing one that found before the update
        // runValidators: true는 모델 안에있는 다큐먼트에서만 업데이트를 가능하게 만들어준다
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!user) {
          return res.status(404).send()
        }
        res.send(user)
      } catch(error) {
        res.status(400).send(error)
      }
    })
    ```
  - 데이터에 없는 필드를 업데이트를 하면 무시된다. 
  - 그렇기 때문에 없는 필드 업데이트를 시도할 때 핸들링할 코드 만들어줘야한다.
    ```js
    const updates = Object.keys(req.body) // [age, _id, name, __V]
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => {
      return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates'})
    }
    ```

<h2 name="61">61. Resource Updating Endpoints 2</h2>

- Goal: Allow for task updates

1. Setup the route handler
2. Send error if unknown updates
3. Attempt to update the task
  - Handle task not found
  - Handle validation errors
  - Handle success
4. Test your work
  ```js
  app.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => {
      return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      if(!task) {
        return res.status(404).send()
      }
      res.send(task)
    } catch {
      res.status(500).send(error)
    }
  })
  ```

<h2 name="62">62. Resource Deleting Endpoints</h2>

- delete 메소드 사용하기
  ```js
  app.delete('/users/:id', async(req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)

      if(!user) {
        return res.status(404).send()
      }

      res.send(user)
    } catch(error) {
      res.status(500).send()
    }
  })
  ```

- Goal: Allow for removal of tasks

1. Setup the endpoint handler
2. Attempt to delete the task by id
  - Handle success
  - Handle task not found
  - Handle error
3. Test your work
  ```js
  app.delete('/tasks/:id', async(req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)

      if(!task) {
        return res.status(404).send()
      }
      res.send(task)
    } catch (error){
      res.status(500).send()
    }
  })
  ```

<h2 name="63">63. Separate Route Files</h2>

- index.js 파일안에 모든 라우트들을 따로 분리해보자 
- 여러개의 express 라우터를 설정한 뒤에 합칠것임 
- 새로운 라우터를 만들고 설정한 뒤에 express에 등록할 것
- routers 폴더를 만들고 그 안에 user.js 파일을 만든다.
- users 모델과 관련된 모든 코드를 옮겨준다.
- 라우터를 export 해준다. 
- index.js 파일에서 users 파일을 import 해준다. 

<h2 name="64">64. Securely Storing Passwords 1</h2>

- 지금 DB에서 유저의 계정 정보를 누구나 볼 수 있다.
- 그러므로 유저의 비밀번호를 해시로 바꿀 ���임
- 이것을 위해 bcryptjs 라이브러리를 사용
-  npm install bcryptjs
- 사용예시
  ```js
  const myFunction = async() => {
  const password = 'red12345!';

  // 첫번째 인수는 비밀번호, 두번째 인수는 해시 알고리즘이 몇번 수행되는지(강사는 8번 추천)
  const hashedPassword = await bcrypt.hash(password, 8)

  console.log(password) // red12345!
  console.log(hashedPassword) // $2a$08$zQ5lXlxlQ04/KD.65CU42eD6FwMxOxDJ4nvJ1KPFQxvDi82Mz6y/a

  // 입력이 된 비밀번호 확인방법
  // compare 함수는 첫번째 인수로 비밀번호, 두번째 인수로는 해시화된 비밀번호를 받는다
  const isMatch = await bcrypt.compare('red12345!', hashedPassword)
  
  console.log(isMatch) // true
  }

  myFunction()
  ```
- Encrypt 알고리즘과 해시 알고리즘의 차이
  - encrypt 알고리즘은 원래 값을 돌려받는다.
  - jay12345 -> owofmspvmwpe123fpqoewqwec -> jay12345
  - 해시 알고리즘은 그냥 one-way 알고리즘으로 값을 돌려받지 않는다.
  - jay12345 -> owofmspvmwpe123fpqoewqwec

<h2 name="65">65. Securely Storing Passwords 2</h2>

- bycript 라이브러리와 app.post와 app.patch를 연결시켜 해시화된 비밀번호 만들기
- 직접적으로 app.post와 app.patch를 건드리는 것이 아니라 user 모델에서 사용할 것
- model 폴더에 있는 user.js 파일에서 몽구스의 미들웨어를 사용하기 위해 몽구스 Schema 안에 모델 필드의 이름과 타입 설정값들을 넣고 모델의 두번째 인수로 그 Schema를 넣은뒤 설정해주면 된다. 
  ```js
  // models/user.js
  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
    
      email: {
        type: String,
        required: true,
        trim: true, 
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
          }
        }
      },
    
      age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) {
            throw new Error('Age must be positive number')
          }
        }
      },
    
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error('Do not set password as a password')
          }
        }
      }
      // Hash the plain text password before saving
      userSchema.pre('save', async function(next) {
       // user 변수 안에는 요청받은 값들이 들어있다 
        const user = this
        // 비밀번호가 해시화 되었는지 검사 
        // 유저가 비밀번호를 생성했을 때와 업데이트 했을때 실행된다 
        if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
        }

        // console.log(just before saving!)

        next()
    }
  );

  const User = mongoose.model('User', userSchema)
  ```
- post에서는 'just before saving'메세지가 나오나 patch에서는 라이브러리가 미들웨어를 우회하기 때문에 메세지가 나오지 않는다.
- 라우터에서 patch의 구조를 조금 바꿔야 한다.

  ```js
  // routers/user.js

  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) 에서

  // 유저모델의 인스턴스 접근
  const user = await User.findById(req.params.id)

  // 예를들어 user의 값이 user = {id: '234rfwfe', name: 'kim', email: 'example@.com', password: 'fwfe32e'}이고
  // 만약 name 프로퍼티의 값을 입력된 값으로({ name: "Godzila" })업데이트 하고 싶다면
  // const updates = Object.keys(req.body);  =>  ['name']
  updates.forEach((update) => {
    user[update] = req.body[update]
  })

  // 이 부분에서 미들웨어가 실행된다 
  await user.save()

  // $npm run dev
  // just before saving!
  ```
- Goal: Change how tasks are updated

1. Find the task
2. Alter the task properties
3. Save the task
4. Test your work by updating a task from Postman

  ```js
  // models/task.js
  taskSchema.pre('save', async function(next) {
    const task = this;

    if(task.isModified('description')) {
      task.description = await bcrypt.hash(task.description, 8)
    }

    next();
  })

  const Task = mongoose.model('tasks',taskSchema)

  // routers/task.js
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if(!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})3
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => {
      task[update] = req.body[update]
    })

    await task.save()

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(error) {
    res.status(404).send(error)
  }
  ```

<h2 name="66">66. Logging in Users</h2>

- 로그인 기능을 담당할 라우트와 스키마 생성

  ```js
  // routers/user.js
  router.post('/users/login', async(req, res) => {
    try {
      // findByCredentials은 이메일과 비밀번호를 받아 유저를 반환함
      const user = await User.findByCredentials(req.body.email, req.body.password);
      res.send(user);
    } catch(error) {
      res.status(400).send();
    }
  })

  // models/user.js
  // schema를 하나 더 생성
  // findByCredentials 함수는 몽구스에 있는 함수가 아님
  // statics는 모델에 접근 가능
  userSchema.statics.findByCredentials = async(email, password) => {
    // 비밀번호는 해시화가 되어있어서 먼저 이메일을 이용해 계정을 찾고 비밀번호를 확인할것
    const user = await User.findOne({ email: email })
    if(!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      throw new Error('Unable to login')
    }

    return user
  }
  ```

<h2 name="67">67.JSON Web Tokens</h2>

- 로그인한 유저에게 토큰 보내기
- JWT(JSON Web Token)을 만들기 위해 npm의 jsonwebtoken을 사용할것
- npm install jsonwebtoken
- 사용예시
  ```js
  const jwt = require('jsonwebtoken');

  const myFunction = async() => {
    // 첫번째 인수는 토큰에 들어갈 객체형태의 데이터, 두번째 인수는 토큰 시크릿, 세번째는 옵션(expiresIn은 토큰 만료기간설정 )
    const token = jwt.sign({ _id: 'abc12345' }, 'Iamironman', {expiresIn: '7 days'})
    console.log(token)

    // 토큰 확인
    // 첫번째 인수는 만든 토큰, 두번째 인수는 토큰 시크릿
    // 시크릿을 통해서 토큰을 해석할 수 있다
    const data = jwt.verify(token, 'Iamironman')
    console.log(data)
  }

  myFunction()

  // 이렇게 data 결과가 나온다
  // 토큰 헤더 (base 64)
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  // 토큰 바디 (base 64)
  //eyJfaWQiOiJhYmMxMjM0NSIsImlhdCI6MTU1OTI4NDYzMX0.
  // 토큰 signature (base 64)
  // YTrQfC0uYnDJEMJN6GOVq9bY29-KuoQNqZkQtdlnYZg

  ```

<h2 name="68">68. Generating Authentication Tokens</h2>

- JSON 토큰을 생성해서 유저에게 보내주기
- 새로운 유저를 만들때와 로그인을 할때 토큰을 보내줘야 하는데 그것을 위해서 재활용이 가능한 함수를 만들것 
  ```js
  // routers/user.js
  router.post('/users/login', async(req, res) => {
    try {
      // findByCredentials은 이메일과 비밀번호를 받아 유저를 반환함
      const user = await User.findByCredentials(req.body.email, req.body.password);

      // user를 위한 토큰을 생성한 뒤 요청자에게 토큰을 보내기 위해 generateAuthToken 함수를 models/user.js에서 만들어준다
      const token = await user.generateAuthToken()

      res.send({user, token});
    } catch(error) {
      res.status(400).send();
    }
  })

  // models/user.js
  
  // method로 generateAuToken 함수를 생성 
  userSchema.method.generateAuToken = async function() {
    const user = this;

    // jwt 만들기
    const token = jwt.sign({ _id: user._id.toString() }, 'Iamironman')
    return token
  }
  ```

<h2 name="69">69. Generating Authentication Tokens</h2>

- 포스트맨에서 이메일과 비밀번호를 Body에 JSON형식으로 보내면
  ```json
  {
    "email": "ishelinkorzelda@example.com",
    "password": "qwerty123"
  }
  ```
- 이런 형식으로 response가 온다.
  ```json
  {
    "user": {
        "age": 0,
        "_id": "5cf5c6d3e17dfe039410c0ae",
        "name": "Zelda",
        "email": "ishelinkorzelda@example.com",
        "password": "$2a$08$TlIrtluP2bTc.FF0pg0iSeDFB2RkSpKIbjfkhUWRlsMNSRDSL51XC",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1YzZkM2UxN2RmZTAzOTQxMGMwYWUiLCJpYXQiOjE1NTk2MTIwNDJ9.w5FkvhOB3lQtComYA9ILkrpvBA53-pCdj4dc-goJG4Y"
  }
  ```
- 즉, 유저가 로그인 했다는 뜻
- 하지만 토큰이 이 상태로 계속 저장되있으면 로그아웃은 불가능하다.
- 로그아웃 기능 만들어주기위해
- 토큰을 user 다큐먼트에 저장하자
- modles/user.js의 userSchema안에 tokens 다큐먼트 만들어주기
  ```js
  tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  ```
- 다음으로 토큰이 생성되면 배열에 넣어주고 DB에 저장시켜주기
  ```js
  userSchema.method.generateAuToken = async function() {
    const user = this;

    // jwt 만들기
    const token = jwt.sign({ _id: user._id.toString() }, 'Iamironman')
    // 토큰 다큐먼트에 생성된 토큰 붙이기 
    user.tokens = user.tokens.concat({ token: token})
    await user.save()
    
    return token
  }
  ```
- 다시한번 포스트맨에서 로그인 요청을 보내면 이렇게 response가 온다.
  ```json
  {
    "user": {
        "age": 0,
        "_id": "5cf5c6d3e17dfe039410c0ae",
        "name": "Zelda",
        "email": "ishelinkorzelda@example.com",
        "password": "$2a$08$TlIrtluP2bTc.FF0pg0iSeDFB2RkSpKIbjfkhUWRlsMNSRDSL51XC",
        "tokens": [
            {
                "_id": "5cf5ca8aec9f0c29142a668a",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1YzZkM2UxN2RmZTAzOTQxMGMwYWUiLCJpYXQiOjE1NTk2MTIwNDJ9.w5FkvhOB3lQtComYA9ILkrpvBA53-pCdj4dc-goJG4Y"
            }
        ],
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1YzZkM2UxN2RmZTAzOTQxMGMwYWUiLCJpYXQiOjE1NTk2MTIwNDJ9.w5FkvhOB3lQtComYA9ILkrpvBA53-pCdj4dc-goJG4Y"
  }
  ```
- _id는 sub-document라고 해서 자동적으로 생성되는 것임.
- Goal: Have singup send back auth token
1. Generate a token for the saved user
2. Send back both the token and the user
3. Create a new user from Postman and confirm the token is there
  ```js
  // routers/user.js
  router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
    } catch(error) {
      res.status(400).send(error);
    }
  })
  ```
  ```json
  // postman에서 유저생성
  {
    "name": "mario",
    "email": "supermario@example.com",
    "password": "qwerty123"
  } 

  // response
  {
    "user": {
        "age": 0,
        "_id": "5cf5d1c4cf12a6247c0f6617",
        "name": "mario",
        "email": "supermario@example.com",
        "password": "$2a$08$PoFPZZG2sjRDEk8Jod3IAO.ydnTJJ0s68R7mlLnHfsqkEJZstXx3S",
        "tokens": [
            {
                "_id": "5cf5d1c4cf12a6247c0f6618",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1ZDFjNGNmMTJhNjI0N2MwZjY2MTciLCJpYXQiOjE1NTk2MTM4OTJ9.Z-4z4f57lg1ZrQSBIijKPGrsSWeSf_n3m68rjzI9AgA"
            }
        ],
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1ZDFjNGNmMTJhNjI0N2MwZjY2MTciLCJpYXQiOjE1NTk2MTM4OTJ9.Z-4z4f57lg1ZrQSBIijKPGrsSWeSf_n3m68rjzI9AgA"
  }
  ```

<h2 name="70">70. Express Middleware</h2>

- 유저가 회원가입을 하거나 로그인할때 api가 인증토큰을 유저에게 보내주고 있으므로 이제 다른 요청을 보낼때 토큰을 어떻게 사용할지 알아볼차례.
- 즉, 회원가입이나 로그인을 제외한 다른 모든 요청들은 인증토큰을 필요로 한다.
- 클라이언트에서 토큰을 주고 서버에서 토큰의 유효성을 평가하는 방식.
- 이것을 위해서 express middleware를 사용할 것.
  ```js
  // express 미들웨어 사용예시
  // app.use위에 위치하도록
  // Without middleware: new request -> run route handler
  // With middleware: new request -> do something -> run route handler

  // express 미들웨어를 사용하게되면 서버의 행동을 커스터마이징 할 수 있다

  // 이 app.use는 새로운 request와 라우터 핸들러 중간에서 작동한다 
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      res.send('GET requests are disabled')
    } else {
      next()
    }
  })
  app.use(express.json())
  app.use(userRouter);
  app.use(taskRouter);

  // 포스트맨에 GET 요청을 보내면 GET requests are disabled라는 메세지가 뜬다. 
  ```
- Goal: Setup middleware for maintenace mode
1. Register a new middleware function
2. Send back a maintenace message with a 503 status code
3. Try you requests from the server and confirm status/message shows
  ```js
  app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon!')
  })
  ```

<h2 name="71">71. Accepting Authentication Tokens</h2>

- express의 미들웨어를 이용해 요청을 보낼때마다 인증토큰을 보내는 방법을 알아보자
- src 폴더에 middleware 폴더를 생성후에 auth.js 파일 만들기
- auth.js에 만들어진 auth 미들웨어는 회원가입/로그인 요청에는 반응하지 않는다. 
  ```js
  // auth.js
  const auth = async (req, res, next) => {
    console.log('auth middleware')
    next()
  }

  module.exports = auth
  ```
- auth 미들웨어 연결시키기
  ```js
  // user.js
  // 유저가 /users에 접속하면 auth 미들웨어를 실행시키고 라우트 핸들러를 실행시킬것
  // 단 라우트 핸들러가 실행되기 위해서는 auth 미들웨어안의 next() 함수가 실행되야한다

    router.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find({})
      res.send(users);
    } catch(error) {
      res.status(500).send();
    }
  })
  ```
- 포스트맨에서 요청을 보내면 콘솔창에 auth middleware 메세지가 나온다.
- 포스트맨에서 유저로부터 읽어들인 토큰정보를 복사해 Headers의 KEY에서는 Authorization, VALUE에서는 Bearer토큰정보를 넣어준다.\
- 그 다음 보내준 정보를 확인하기 위해 auth 코드를 바꿔준다.
  ```js
  // auth.js
  const jwt = require('jsonwebtoken');
  const User = require('../models/user');

  const auth = async (req, res, next) => {
    try {
      // header 메소드를 이용해 요청보낸 헤더에 접근가능
      const token = req.header('Authorization')
      console.log(token)
    } catch(e) {
      res.status(401).send({error: 'Please authenticate'})
    }
  }

  module.exports = auth
  ```
- 그다음 포스트맨으로 요청을 보내면 콘솔창에 보낸 Bearer 토큰값이 나온다.
- 거기서 jwt를 따로 빼준다음에 시크릿을 이용해 validation 체크해주기
  ```js
  const jwt = require('jsonwebtoken');
  const User = require('../models/user');

  const auth = async (req, res, next) => {
    try {
      // header 메소드를 이용해 요청보낸 헤더에 접근가능
      // 헤더에 있는 토큰을 받아서 단어 Bearer을 제거
      const token = req.header('Authorization').replace('Bearer ', '')
      // 토큰 시크릿을 이용해 풀어주기
      const decoded = jwt.verify(token, 'Iamironman')
      // tokens.token은 토큰 배열에 보낸 토큰 있는지를 검사
      // find the user with correct id who has authentication token is stored
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

      if(!user) {
        throw new Error()
      }

      // request 프로퍼티에 user정보를 저장함으로써 라우트 핸들러가 다음에 다시 접근할 수 있다.
      req.user = user
      next()
    } catch(e) {
      res.status(401).send({error: 'Please authenticate'})
    }
  }

  module.exports = auth
  ```
- user.js에서 users 미들웨어는 데이터가 노출되어있다는 문제점이 있다. 
- 즉 로그인을 하게되면 다른 유저의 정보까지 노출될 수 있으므로 user 라우트를 수정해준다.
  ```js
  router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
  })
  ```

<h2 name="72">72. Logging Out</h2>

- 로그아웃을 위한 라우터 설정해주기
- 특정 인증토큰에 해당되는 유저만 로그아웃되게 만들어주기 
  ```js
  const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = jwt.verify(token, 'Iamironman')
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
      if(!user) {
        throw new Error()
      }

      // 토큰 설정
      req.token = token
      req.user = user
      next()
    } catch(e) {
      res.status(401).send({error: 'Please authenticate'})
    }
  }
  ```
  ```js
  // routers/user.js
  router.post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        // 발견한 토큰이 인증때 사용한 토큰이면 true 아니면 false
        return token.token !== req.token
      })
      // 발견되면 저장하고 200 코드 보내주기
      await req.user.save()
      res.send()
    } catch(e) {
      res.status(500).send()
    }
  })
  ```
- Goal: Create a way to logout of all sessions
1. Setup POST/users/logoutAll
2. Create the router handler to wipe the tokens array
  - Send 200 or 500
3. Test your work
  - Login a few times and logout of all. Check database
  ```js
    router.post('/users/logoutAll', auth, async (req, res) => {
    try {
      req.user.tokens = []
      await req.user.save()
      res.send()
    } catch(e) {
      res.status(500).send()
    }
  })
  ```

<h2 name="73">73. Hiding Private Data</h2>

- 로그인하면 유저에게 필요한 정보만 보여주기 (프로필 데이터만 보여주기)
- 그렇게 하기 위해서 로그인 라우터 수정해주기
  ```js
  // models/user.js
  userSchema.methods.getPublicProfile = function() {
    const user = this;
    // 유저데이터 
    // userObject를 이용해 원하는 데이터만을 노출시킬 수 있다. 
    const userObject = user.toObject();

    // userObject안에서 필요없는 데이터 지우기
    delete userObject.password
    delete userObject.tokens

    return userObject
  }
 
  // routers/user.js
  router.post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);

      const token = await user.generateAuthToken();

      res.send({user: user.getPublicProfile(), token});
    } catch(error) {
      res.status(400).send();
    }
  })
  ```
  ```json
  // 포스트맨에서 로그인 요청을 보내면 이렇게 response가 온다
  // user에서 password와 token이 지워졌다 
  {
      "user": {
          "age": 0,
          "_id": "5cf5c6d3e17dfe039410c0ae",
          "name": "Zelda",
          "email": "ishelinkorzelda@example.com",
          "__v": 12
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Y1YzZkM2UxN2RmZTAzOTQxMGMwYWUiLCJpYXQiOjE1NjAyMTUyNzR9.-IrKIXTfpbHqUwKpP_M3LwQH2cHYLvUwtrG8Xt9DRek"
  }
  ```
- 요청을 보낼때마다 getPublicProfile함수가 실행된다. 좀 더 효율적으로 코드를 바꿔보자 
  ```js
  // models/user.js
  userSchema.methods.toJSON = function() {
    const user = this;
    // 유저데이터 
    // userObject를 이용해 원하는 데이터만을 노출시킬 수 있다. 
    const userObject = user.toObject();

    // userObject안에서 필요없는 데이터 지우기
    delete userObject.password
    delete userObject.tokens

    return userObject
  }

  // routers/user.js
  router.post('/users/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({user, token});
    } catch(error) {
      res.status(400).send();
    }
  })
  ```
  ```json
  // 포스트맨에서 get profile을 하게되면
  {
      "age": 0,
      "_id": "5cf5c6d3e17dfe039410c0ae",
      "name": "Zelda",
      "email": "ishelinkorzelda@example.com",
      "__v": 13
  }
  ```
<h2 name="74">74. Authentication User Endpoints</h2>

- 수정 및 삭제 기능에도 authentication 작업해주기 
  ```js
  // 사용자의 id값을 숨기기 위해 :id대신 /me를 사용 
  router.delete('/users/me', auth, async (req, res) => {
    try {
      // const user = await User.findByIdAndDelete(req.user._id)

      // if(!user) {
      //   return res.status(404).send()
      // }
      await req.user.remove()
      res.send(req.user)
    } catch(error) {
      res.status(500).send()
    }
  })
  ```
- Goal: Refactor the update profile route
1. Update the URL to /users/me
2. Add the authentication middleware into the mix
3. Use the existing user document instead of featching via param id
4. Test your work in Postman
  ```js
  router.patch('/users/me', auth, async(req, res) => { 
    const updates = Object.keys(req.body); // [age, _id, name, __v]
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => {
      return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
      // const user = await User.findById(req.params.id)
      updates.forEach((update) => {
        req.user[update] = req.body[update]
      })
      await req.user.save()

      res.send(req.user)
    } catch(error) {
      res.status(400).send(error)
    }
  })
  ```

<h2 name="75">75. The User/Task Relationship</h2>

- task영역 작업을 시작할것 
- user와 task의 관계를 생각해 볼 것. (로그인한 유저의 task만 보도록 만들어야 한다)
- task 라우터에서 task를 만든 유저의 정보를 저장할것 
  ```js
  const Task = new mongoose.Schema(
    {
      description: {
        type: String,
        required: true,
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  )

  module.exports = Task
  ```
- task를 생성하는 endpoint 고쳐주기 