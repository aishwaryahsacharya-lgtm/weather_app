// script.js - Secure version (calls YOUR backend)
const cityInput = document.getElementById('cityInput');
const getBtn = document.getElementById('getBtn');
const resultDiv = document.getElementById('result');

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  // UI states
  getBtn.disabled = true;
  getBtn.textContent = "Loading...";
  resultDiv.className = "card show";
  resultDiv.innerHTML = `<div class="loading"><div class="spinner"></div>Fetching weather for ${city}...</div>`;

  try {
    // SECURE WAY: Call our own Flask backend. API key stays hidden on server.
    // For frontend-only demo, change this to direct OpenWeather URL:
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.cod !== 200) {
      // Handle OpenWeather errors forwarded by backend
      if (data.cod == 401) throw new Error("Invalid API Key. Wait 15 mins after creating key.");
      if (data.cod == 404) throw new Error(`City '${city}' not found.`);
      throw new Error(data.message || "Failed to fetch weather");
    }

    showWeather(data);

  } catch (err) {
    showError(err.message);
  } finally {
    getBtn.disabled = false;
    getBtn.textContent = "Get Weather";
  }
}

function showWeather(data) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  setWeatherTheme(data.weather[0].main); // additive: only toggles a body class for the seasonal/glass background
  resultDiv.innerHTML = `
    <div class="weather-main">
      <div>
        <div class="city">${data.name}, ${data.sys.country}</div>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="condition">${data.weather[0].description}</div>
      </div>
      <img src="${icon}" width="110" alt="weather icon">
    </div>
    <div class="details">
      <div class="detail-box"><span>Feels Like</span><strong>${Math.round(data.main.feels_like)}°C</strong></div>
      <div class="detail-box"><span>Humidity</span><strong>${data.main.humidity}%</strong></div>
      <div class="detail-box"><span>Wind</span><strong>${data.wind.speed} m/s</strong></div>
      <div class="detail-box"><span>Pressure</span><strong>${data.main.pressure} hPa</strong></div>
    </div>
  `;
}

function showError(msg) {
  resultDiv.className = "card show";
  resultDiv.innerHTML = `<div class="error">❌ ${msg}</div>`;
  setWeatherTheme(null); // additive: reset to default premium theme on error
}

/* ------------------------------------------------------------------
   ADDITIVE ONLY: purely cosmetic. Maps the OpenWeather "main" field
   to a body class so CSS can render the matching seasonal/glass
   background + animation. Does not touch API calls, DOM hooks used
   by the app, or any existing logic above.
-------------------------------------------------------------------*/
function setWeatherTheme(main) {
  const themes = ['theme-clear', 'theme-clouds', 'theme-rain', 'theme-thunderstorm', 'theme-snow', 'theme-mist', 'theme-default'];
  document.body.classList.remove(...themes);

  if (!main) {
    document.body.classList.add('theme-default');
    return;
  }

  const condition = main.toLowerCase();
  if (condition === 'clear') {
    document.body.classList.add('theme-clear');
  } else if (condition === 'clouds') {
    document.body.classList.add('theme-clouds');
  } else if (condition === 'rain' || condition === 'drizzle') {
    document.body.classList.add('theme-rain');
  } else if (condition === 'thunderstorm') {
    document.body.classList.add('theme-thunderstorm');
  } else if (condition === 'snow') {
    document.body.classList.add('theme-snow');
  } else if (['mist', 'fog', 'haze', 'smoke', 'dust', 'sand'].includes(condition)) {
    document.body.classList.add('theme-mist');
  } else {
    document.body.classList.add('theme-default');
  }
}

// Enter key support
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather();
});
getBtn.addEventListener('click', getWeather);

/*
FRONTEND-ONLY VERSION (if you don't have Flask):
Uncomment this if you want to test without backend:

let API_KEY = localStorage.getItem('weather_key') || '';
async function getWeatherDirect() {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  ...
}
*/
