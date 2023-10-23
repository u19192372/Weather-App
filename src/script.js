let date = new Date();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function currentTime() {
  let dayOfWeek = daysOfWeek[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let time = `${hours}:${minutes}`;
  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = dayOfWeek + " " + time;
}
currentTime();

function userCity() {
  let city = document.querySelector(".inputCity");
  let input = city.value;

  let name = document.querySelector("#cityName");
  name.innerHTML = input;

  let apiKey = "c0f9c8550fa7cc99a088b28b64ace039";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let searchButton = document.querySelector("button");
searchButton.addEventListener("click", userCity);
let inputField = document.querySelector(".inputCity");
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    userCity();
  }
});

function showTemp(response) {
  let tempreture = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#degrees");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = `${tempreture} `;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (14 * 9) / 5 + 32;
  let degreesElement = document.querySelector("#degrees");
  degreesElement.innerHTML = Math.round(fahrenheitTemp);
  //remove active class from celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#degrees");
  degreesElement.innerHTML = Math.round(celsiusTemp);

  //remove active class from fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLinkLink.addEventListener("click", displayCelsiusTemp);
