    document.addEventListener('DOMContentLoaded', () =>{
        const cityInput = document.getElementById("city-name");
        const getWeather = document.getElementById("search-button");
        const API_KEY = "";//env variable

        const cityDetails = document.getElementById("city-details");
        const cityTemp = document.getElementById("city-temperature");
        const cityWeather = document.getElementById("city-weather");

        const weatherDetails = document.getElementById("weather-details");
        const cityName = document.getElementById("city-nameDisplay");
        const dateTime = document.getElementById("date-time");
        const errorMsg = document.getElementById("error-msg");
        const weatherIcon = document.getElementById("weather-icon");

        // Mapping weather description to icons
        const weatherIcons = {
            "clear sky": "https://cdn-icons-png.flaticon.com/512/4735/4735121.png",
            "few clouds": "https://cdn-icons-png.flaticon.com/512/14838/14838434.png",
            "scattered clouds": "https://cdn-icons-png.flaticon.com/512/12607/12607703.png",
            "overcast clouds": "https://cdn-icons-png.flaticon.com/512/12607/12607703.png",
            "mist": "https://cdn-icons-png.flaticon.com/512/4161/4161243.png",
            "smoke": "https://cdn-icons-png.flaticon.com/512/12607/12607703.png",
            "haze": "https://cdn-icons-png.flaticon.com/512/2930/2930095.png",
            "rain": "https://cdn-icons-png.flaticon.com/512/4478/4478287.png",
            "snow": "https://cdn-icons-png.flaticon.com/512/4735/4735107.png",
            "thunderstorm": "https://cdn-icons-png.flaticon.com/512/14838/14838448.png",
            "drizzle": "https://cdn-icons-png.flaticon.com/512/4735/4735072.png"
        };


        getWeather.addEventListener('click', async () =>{
            const city = cityInput.value.trim();
            if(!city) return;

            try {
              const weatherData = await fetchWeatherData(city);
              displayWeatherData(weatherData);
            } catch (error) {
                showError();
            }
        })

        async function fetchWeatherData(city){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

            const response = await fetch(url);
            console.log(typeof response);
            console.log(response);

            if(!response.ok){
                throw new Error("City not found!");
            }
            const data = await response.json();
            return data;
        }

        function displayWeatherData(data){
            console.log(data);
            const{name, main, weather} = data;
            // Convert Kelvin to Celsius
            const tempCelsius = (main.temp - 273.15).toFixed(1);
            cityName.textContent = name;
            cityTemp.textContent = `${tempCelsius}°C`; // Display temperature
            cityWeather.textContent = weather[0].description

            // Update the weather icon based on the weather description
            const weatherDescription = weather[0].description.toLowerCase();
            weatherIcon.src = weatherIcons[weatherDescription] || "https://cdn-icons-png.flaticon.com/512/12607/12607703.png"; // Default icon if no match

            cityDetails.classList.remove("hidden");
            weatherDetails.classList.remove("hidden");
            errorMsg.classList.add("hidden");

        }

        function showError(){
            errorMsg.classList.remove("hidden");
            cityDetails.classList.add("hidden");
            weatherDetails.classList.add("hidden");
        }
    })