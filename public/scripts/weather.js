// scripts/weather.js
/*
API = 'cf3f5182dcc9eadfc32d22fe86ccd370'; // Replace with your API key
const searchInput = document.querySelector("#searchInput")
searchButton = document.querySelector("#submit")
weatherIcon = document.querySelector("#weatherIcon")
windSpeed = document.querySelector("#windSpeed")
humidity = document.querySelector(".humidity")
weather = document.querySelector(".weather")
desc = document.querySelector(".desc")
//API = "8cf5ac5621c8d0266298a149e49d7514";
// --------------------- Created By InCoder ---------------------
const setWeatherDetails = (data) => {
    // console.log(data);
    desc.innerHTML = data.weather[0].description;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = "images/Clouds.png";
            break;
        case 'Clear':
            weatherIcon.src = "images/sun.png";
            break;
        case 'Rain':
            weatherIcon.src = "images/rainy.png";
            break;
        case 'Mist':
            weatherIcon.src = "images/mist.png";
            break;
        case 'Snow':
            weatherIcon.src = "images/snow.png";
            break;
        case 'Haze':
            weatherIcon.src = "images/haze.png";
            break;
    }
}

const callAPI = (id) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`)
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                alert("Check spelling of City and try again or Something Went Wrong!");
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setWeatherDetails(data);
        })
        .catch(error => console.log(error))
}

searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        alert("Please Enter City Name.");
    } else {
        callAPI(API);
    }
})

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchButton.click();
    }
})

searchButton.click(); */

fetchWeather('Chennai');

    function openModal() {
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
    }

    function cancel() {
        closeModal();
    }
    function updateHeader() {
      const headerText = document.getElementById('headerText');
      const searchInput = document.getElementById('searchInput').value;
      event.preventDefault();
    fetchWeather(searchInput);
      if (searchInput.trim() !== "") {
        headerText.textContent = searchInput;
        closeModal();
      }
    }

    function closeModal() {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
    }
      

function fetchWeather(location) {
    let apiKey = 'cf3f5182dcc9eadfc32d22fe86ccd370';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
             weatherData = {
                city: data.name,
                country: data.sys.country,
                temperature: Math.round(data.main.temp - 273.15),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                icon: data.weather[0].icon
            };
            displayWeather(weatherData);
            console.log(weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
        });
}

function displayWeather(weatherData) {
    let weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <h1 style="font-size: 30px; color:#f0ffff;  margin: 0; text-align: center"><img src="http://openweathermap.org/img/wn/${weatherData.icon}.png" alt="Weather Icon" width="30" height="30">${weatherData.temperature}°C<img src="http://openweathermap.org/img/wn/${weatherData.icon}.png" alt="Weather Icon" width="30" height="30"></h1>
        <div style="display:flex; flex-direction: row; align-items: center;">
        <p style="font-size:20px; margin: 0; color:#f00f0f;">${weatherData.description}</p>
        <p style="font-size:15px; color:#000; margin-left: 6px; ">Humidity: ${weatherData.humidity}%</p>
        <div>
    `;
}
                

