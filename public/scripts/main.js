console.log('client side js');

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const output = document.querySelector('#message-1');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch(`/weather?address=${address.value}`)
  .then((resp) => {
    resp.json().then((data) => {
      output.textContent = data.city.description;
    });
  })
})