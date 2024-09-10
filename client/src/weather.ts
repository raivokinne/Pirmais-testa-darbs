const apiKey = '0923ac6a20bc532cfa3f2a1e11287da8';
const city = 'Cesis';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=lv`;

async function getWeather() {
	try {
		const response = await fetch(url);
		const data = await response.json();

		const temperature = data.main.temp;
		const description = data.weather[0].description;
		const iconCode = data.weather[0].icon;

		const weatherBox = document.getElementById('weather');
		if (!weatherBox) {
			throw new Error('Weather box not found');
		}
		weatherBox.innerHTML = `
            <h2>Laikapstākļi Cēsīs</h2>
            <p>Temperatūra: ${temperature}°C</p>
            <p>Apraksts: ${description}</p>
            <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon">
        `;
	} catch (error) {
		console.error('Kļūda iegūstot datus:', error);
	}
}

getWeather();
