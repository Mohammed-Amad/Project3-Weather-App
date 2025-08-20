const API_KEY = "913f09f0814f0b6a103f2033f5f8d2a6";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusBox = document.getElementById("status");
const resultBox = document.getElementById("result");

const rCity = document.getElementById("rCity");
const rTemp = document.getElementById("rTemp");
const rHum  = document.getElementById("rHum");
const rDesc = document.getElementById("rDesc");
const rUpdated = document.getElementById("rUpdated");

async function getWeather(city) {
  statusBox.textContent = "Loading...";
  resultBox.classList.add("d-none");

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      statusBox.textContent = data?.message ? `Error: ${data.message}` : "City not found!";
      return;
    }

    rCity.textContent = `${data.name}, ${data.sys.country}`;
    rTemp.textContent = Math.round(data.main.temp);
    rHum.textContent  = data.main.humidity + "%";
    rDesc.textContent = data.weather[0].description;
    rUpdated.textContent = "Updated: " + new Date().toLocaleString();

    statusBox.textContent = "";
    resultBox.classList.remove("d-none");
  } catch {
    statusBox.textContent = "Error fetching weather!";
  }
}

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (city) {
    localStorage.setItem("lastCity", city); 
    getWeather(city);
  }
};

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lastCity");
  if (saved) {
    cityInput.value = saved;
    getWeather(saved);
  }
});
