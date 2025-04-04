function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = 'temp key'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiGeocoderURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    let cityMatch, cityLon, cityLat, apiWeatherUrl;
    fetch(apiGeocoderURL)
        .then(response => response.json())
        .then(data => {
            cityMatch = data.find(elem => elem.name === city);
            if (cityMatch === undefined) {
                alert(`No city named ${city} was found`);
                throw Error();
            }
            cityLon = cityMatch.lon;
            cityLat = cityMatch.lat;
            
            apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric`;
            
            fetch(apiWeatherUrl)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML = `<h2>Weather in ${city}</h2>
                                        <p>Temperature: ${data.main.temp} &#8451;</p>
                                        <p>Weather: ${data.weather[0].description}</p>`;
            })
            .catch(error => {
                throw error;
            })
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
          });
}

document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
