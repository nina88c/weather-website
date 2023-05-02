// Format date to day and time
function formatDate(date) {
  // Get hours and pad with leading zero if less than 10
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  // Get minutes and pad with leading zero if less than 10
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // Get day of week
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  // Return formatted date string
  return `${day} ${hours}:${minutes}`;
}

// Update HTML with weather condition data
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  // Set the celsiusTemperature variable to the current temperature
  celsiusTemperature = response.data.main.temp;
  // Update temperatureElement with the rounded celsiusTemperature value
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  // Update weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Search for weather condition by city name
function searchCity(city) {
  let apiKey = "52b8bc75d3b4921bba2e6b9d93586ec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Call API and display weather condition on success
  axios.get(apiUrl).then(displayWeatherCondition);
}

// Handle search form submission
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// Search for weather condition by user's location
function searchLocation(position) {
  let apiKey = "52b8bc75d3b4921bba2e6b9d93586ec5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  // Call API and display weather condition on success
  axios.get(apiUrl).then(displayWeatherCondition);
}

// Handle current location button click
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Handle Fahrenheit button click
function diplayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// Handle Celsius button click
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", diplayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Set date element to current date and time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Add event listener for search form submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Add event listener for current location button click
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Search for weather condition for default city
searchCity("London");
