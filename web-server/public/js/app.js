console.log('Clinet side js file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  messageTwo.textContent = 'LOADING...'

  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (!data) {
        messageOne.textContent = 'error occured!'
      } else {
        const {summary, temperature} = data.forecast
        messageOne.textContent = data.location
        messageTwo.textContent = `날씨: ${summary}, 온도: ${temperature}`
      }
    });
  });
});
