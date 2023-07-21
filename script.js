// Function to toggle day & night mode
function toggleDayNightMode() {
  document.body.classList.toggle("day-mode");
}

// Function to format the date as "21 July 2023"
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Fetch weather data and update the weather forecast
async function fetchWeatherData() {
  const response = await fetch("https://api.weather.gov/gridpoints/FWD/115,120/forecast", {
    headers: {
      'User-Agent': 'crache.net, nation@crache.net'
    }
  });
  const data = await response.json();

  const forecastDiv = document.getElementById("weather-forecast");
  data.properties.periods.forEach((day) => {
    const weatherDay = document.createElement("div");
    weatherDay.classList.add("weather-day");
    weatherDay.innerHTML = `
      <div class="weather-icon">
        <img src="${day.icon}" alt="${day.shortForecast}">
      </div>
      <div class="weather-temp">${day.temperature} °F</div>
      <div>${day.shortForecast}</div>
    `;
    forecastDiv.appendChild(weatherDay);
  });
}

// Update the clock and date
function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  const dateString = formatDate(now);
  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

// Set up event listener for day & night mode toggle
const toggleBtn = document.getElementById("toggle-btn");
toggleBtn.addEventListener("click", toggleDayNightMode);

// Initial setup
fetchWeatherData();
updateClock();
setInterval(updateClock, 1000); // Update clock every second
