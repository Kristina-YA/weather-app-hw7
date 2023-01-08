let currentDate = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let mounth = currentMonth + 1;
  let number = date.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (mounth < 10) {
    mounth = `0${mounth}`;
  }
  if (number < 10) {
    number = `0${number}`;
  }
  let updateDate = ` ${number}.${mounth}.${currentYear}`;
  let dateHtml = document.querySelector("#date");
  dateHtml.innerHTML = updateDate;
  let time = document.querySelector("#time");
  time.innerHTML = ` ${day} ${hours}:${minutes}`;
}

formatDate(currentDate);

let city = document.querySelector("#search");
let header = document.querySelector("h3");

function enterCity(event) {
  event.preventDefault();

  let newCity = city.value;
  console.log(newCity);
  header.innerHTML = newCity;

  function searchCity(newCity) {
    let key = "4a024tf7d3bb1a1d99bfb3e958o13344";
    let url = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${key}`;
    axios.get(url).then(showData);
  }
  searchCity(newCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

//API

function showData(response) {
  let icon = document.querySelector("#icon");
  let temperature = document.querySelector("#temp");
  let description = document.querySelector("#descr");
  let windy = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");

  let currentTemp = `${Math.round(response.data.temperature.current)}`;

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
  temperature.innerHTML = currentTemp;
  description.innerHTML = response.data.condition.description;
  windy.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;

  function displayFahrenheit(e) {
    e.preventDefault();

    celsiusTemp.classList.remove("active");
    fahrenheitTemp.classList.add("active");

    let fahrenheitTemperature = (currentTemp * 9) / 5 + 32;
    let temperatureEl = document.querySelector("#temp");
    temperatureEl.innerHTML = Math.round(fahrenheitTemperature);
  }
  let fahrenheitTemp = document.querySelector("#fahrenheit-link");
  fahrenheitTemp.addEventListener("click", displayFahrenheit);

  function displayCelsius(e) {
    e.preventDefault();

    celsiusTemp.classList.add("active");
    fahrenheitTemp.classList.remove("active");

    let temperatureEl = document.querySelector("#temp");
    temperatureEl.innerHTML = currentTemp;
  }

  let celsiusTemp = document.querySelector("#celsius-link");
  celsiusTemp.addEventListener("click", displayCelsius);
}
