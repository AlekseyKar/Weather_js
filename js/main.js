const API_KEY = '4d0acb5c587ea09e45d027229439b325';

const form = document.querySelector('#form');
const input = document.querySelector('.form__input');

form.onsubmit = submitHandler;

async function submitHandler(e) {
	e.preventDefault();

	if (!input.value.trim()) {
		console.log('Enter City name');
		return;
	}

    const cityName = input.value.trim();
    input.value = ''

	const cityInfo = await getGeo(cityName);
    console.log('cityInfo', cityInfo);

    if (!cityInfo.length) return;

	const weatherInfo = await getWeather(
		cityInfo[0]['lat'],
		cityInfo[0]['lon']
	);

    console.log(weatherInfo.name);
	console.log(weatherInfo.weather[0]['main']);

	const weatherData = {
		name: weatherInfo.name,
		temp: weatherInfo.main.temp,
		humidity: weatherInfo.main.humidity,
		speed: weatherInfo.wind.speed,
		main: weatherInfo.weather[0]['main'],
	};

	renderWeatherData(weatherData);
}

async function getGeo(name) {
		const url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
}

async function getWeather(lat, lon) {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
		const response = await fetch(weatherUrl);
		const data = await response.json();
		return data;
}