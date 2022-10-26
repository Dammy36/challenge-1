let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "monday",
  "Tuesday",
  " Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours} :${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#select-form");
form.addEventListener("submit", searchCity);

function select(event) {
  event.preventDefault();
  let tempareture = document.querySelector("#current-tempareture");
  tempareture.innerHTML = 26;
}
function city(event) {
  event.preventDefault();
  let city = document.querySelector("#current-tempareture");
  city.innerHTML = 60;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", select);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", city);

function showCity(city) {
  let apikey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  showCity(searchInput.value);
}

function searchLocaton(position) {  
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);  
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocaton);
}

function showWeather(response) {
  console.log({ response });
  let cityPlace = document.querySelector("h1");
  cityPlace.innerHTML = response.data.name;
  let temparature = document.querySelector("#current-tempareture");
  temparature.innerHTML = Math.round(response.data.main.temp);

  let precipation = document.querySelector("#humidity");
  precipation.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let describtion = document.querySelector("#desc");
  describtion.innerHTML = response.data.weather[0].main;
}
let selectForm = document.querySelector("#current");
selectForm.addEventListener("click", showPosition);