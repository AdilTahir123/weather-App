gsap.from(".container h1", 
    { duration: 3, y: -400, opacity: 0, rotation: 360, delay: 1 });
gsap.from(".container button", 
    { duration: 3, x: 400, opacity: 0, rotation: 360, delay: 1 });
gsap.from(".container form input", 
    { duration: 3, x: -400, opacity: 0, rotation: -360, delay: 1 });
gsap.from('.weather-info', 
    { duration: 3, y: 400, opacity: 0, rotation: 360, delay: 1 });

const input = document.querySelector('.location-input');
const button = document.querySelector('.container button');
const weatherInfo = document.querySelector('.weather-info');

const apiKey = '20bb56c260bfa09844286d082839a34b';

button.addEventListener('click', (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

      if(data.cod === 200){
        const weatherHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
        `;
        weatherInfo.innerHTML = weatherHTML;
      } else {
        weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
      }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
