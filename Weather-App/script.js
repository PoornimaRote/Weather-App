let searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
	if (e.keyCode == 13) {
		callWeatherApi(searchBox.value);
	}
}

function callWeatherApi(cityName) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=cfd1f0e422ccb37164a3cfbc5edfc9b2`
	)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			showResults(res);
		});
}

function showResults(weatherData) {
	let city = document.querySelector(".city");
	let temp = document.querySelector(".temp");
	let weather = document.querySelector(".weather");
	let date = document.querySelector(".date");
	let highLow = document.querySelector(".hi-low");

	city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
	temp.innerText = `${Math.round(weatherData.main.temp)}°c`;
	highLow.innerText = `${Math.round(
		weatherData.main.temp_min
	)}°c / ${Math.round(weatherData.main.temp_max)}°c`;
	weather.innerText = `${weatherData.weather[0].main}`;
	date.innerText = formDate();

	// Set background image based on weather condition
	setBackground(weatherData.weather[0].main);
	//setDayNightMode();
}

function setBackground(weatherCondition) {
	let body = document.querySelector("body");
	let background;

	switch (weatherCondition) {
		case "Clouds":
			background = "background/cloudy.jpg";
			break;
		case "Rain":
		case "Drizzle":
			background = "background/rainy.jpeg";
			break;
		case "Thunderstorm":
			background = "background/thunderstorm.jpeg";
			break;
		case "Snow":
			background = "background/snowfall.jpeg";
			break;
		case "Sunny":
		case "Clear":
			background = "background/sunny.webp";
			break;
		case "Dust":
		case "Smoke":
		case "Haze":
			background = "background/dusty.jpeg";
			break;
		default:
			background = "background/bg.jpg";
	}

	body.style.backgroundImage = `url(${background})`;
}

// function setDayNightMode() {
// 	let body = document.querySelector("body");
// 	let currentDate = new Date();
// 	let hour = currentDate.getHours();

// 	if (hour >= 18 && hour < 6) {
// 		// Nighttime
// 		console.log("Night mode activated");
// 		body.classList.add("night-mode");
// 	} else {
// 		// Daytime
// 		console.log("Day mode activated");
// 		body.classList.remove("night-mode");
// 	}
// }

function formDate() {
	let months = [
		"January",
		"Februray",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	
	// currentDate.setHours(19);
	//let hour = currentDate.getHours();
	//let minute = currentDate.getMinutes();
	//let period = hour >= 12 ? "PM" : "AM";
	//hour = hour % 12 || 12; // Convert hour to 12-hour format

	let currentDate = new Date();
	return `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${
		months[currentDate.getMonth()]
	} ${currentDate.getFullYear()}`;
}
