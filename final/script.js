function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "&appid=84c7e330020cc82d67165fb90c63fd43";

  console.log("Initiating weather data retrieval...");

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    console.log("Geolocation success: ", latitude, longitude);

    let url = api + "lat=" + latitude + "&lon=" + longitude + apiKey + "&units=imperial";

    fetch(url)
      .then(response => {
        console.log("Received response from API");
        return response.json();
      })
      .then(data => {
        console.log("Data: ", data);
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML = data.name;
        description.innerHTML = data.weather[0].main;
      })
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();