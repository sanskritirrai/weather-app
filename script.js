const api="d508c80ce2845ed405a8f6a4724a6409";
const searchBtn=document.getElementById("search-btn");
const cityInput=document.getElementById("name");
const info=document.getElementById("info");
const searchHistory=document.getElementById("search-history");

window.onload= showHistory;

searchBtn.onclick=()=>{
    const city=cityInput.value.trim();
    if (city)getWeather(city);
    else alert("Please enter a city name");
};
async function getWeather(city) {
    info.innerHTML = "Loading...";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        info.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;

        saveHistory(data.name);
    } catch (error) {
        info.innerHTML = "";
        alert(error.message);
    }
}

function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem("cities")) || [];

    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("cities", JSON.stringify(history));
    }

    showHistory();
}

function showHistory() {
    const history = JSON.parse(localStorage.getItem("cities")) || [];

    searchHistory.innerHTML = "";

    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.onclick = () => getWeather(city);
        searchHistory.appendChild(li);
    });
}