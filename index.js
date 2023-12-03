const apiKey = "a26aa4106833b31408773955d87dc00e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName){
    if(cityName === undefined || cityName === null || cityName === "") {
        window.alert("City name can't be empty");
        return;
    }

    const response = await fetch(apiUrl+ cityName + `&appid=${apiKey}`);
    let data = await response.json();

    if(data.cod === "404") {
        window.alert("Invalid city name");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Kmph";

    if(data.weather[0].main === "Clouds"){
        weatherIcon.src = "images/clouds.png";
    } else if(data.weather[0].main === "Clear"){
        weatherIcon.src = "images/clear.png";
    } else if(data.weather[0].main === "Rain"){
        weatherIcon.src = "images/rain.png";
    } else if(data.weather[0].main === "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    } else if(data.weather[0].main === "Mist" || data.weather[0].main === "Haze"){
        weatherIcon.src = "images/mist.png";
    } else if(data.weather[0].main === "Snow"){
        weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
}

checkWeather("Dhaka");

searchButton.addEventListener("click", ()=>{
    checkWeather(searchInput.value)
});

