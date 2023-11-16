let url = "https://api.openweathermap.org/data/2.5/weather?";
let units = "&units=imperial&q=";
let city = "Shanghai";
let apikey = "&appid=a7d4aea0571a0f505398c00a7690b7a4";
let bgCol = 0;
let displayText = "Visualize temperature from Open Weather data";

document.addEventListener("DOMContentLoaded", function () {
  getWeatherData();
});

function getWeatherData() {
  let request = url + units + city + apikey;
  
  fetch(request)
    .then(response => response.json())
    .then(dataLoaded)
    .catch(error => console.error('Error fetching data:', error));
}

function dataLoaded(data) {
    let temperature = data.main.temp;
    let feelsLike = data.main.feels_like;
    let tempMin = data.main.temp_min;
    let tempMax = data.main.temp_max;
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let weatherDescription = data.weather[0].description;
  
    displayText = `
      Temperature: ${temperature} °F
      Feels Like: ${feelsLike} °F
      Min Temperature: ${tempMin} °F
      Max Temperature: ${tempMax} °F
      Pressure: ${pressure} hPa
      Humidity: ${humidity}%
      Wind Speed: ${windSpeed} m/s
      Weather Description: ${weatherDescription}
    `;

    updateDOM();
  }
  

function updateDOM() {
  let textElement = document.getElementById("temperature-info");
  if (!textElement) {
    textElement = document.createElement("p");
    textElement.id = "temperature-info";
    document.body.appendChild(textElement);
  }
  textElement.textContent = displayText;
}
