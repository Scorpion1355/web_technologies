function debounce(fn, duration = 300) {
    let timeoutId;

    return (...args) => {
        const afterTimeout = () => {
            clearTimeout(timeoutId);
            fn(...args);
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(afterTimeout, duration)
    }
}

function show(id, text) {
    const element = document.getElementById(id);

    const textContent = document.createTextNode(text);
    element.replaceChildren(textContent);
}

function showTime(timeString) {
    show('time-element', timeString)
}

function showTemperature(temperatureString) {
    show('temperature-element', temperatureString)
}

function onCityChange(fn) {
    const element = document.getElementById('city-input');
    const debouncedFn = debounce(fn);

    element.addEventListener('input', (event) => debouncedFn(event.target.value));
}

// YOUR CODE HERE


function debounce(fn, duration = 300) {
    let timeoutId;

    return (...args) => {
        const afterTimeout = () => {
            clearTimeout(timeoutId);
            fn(...args);
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(afterTimeout, duration)
    }
}

function show(id, text) {
    const element = document.getElementById(id);

    const textContent = document.createTextNode(text);
    element.replaceChildren(textContent);
}

function showTime(timeString) {
    show('time-element', timeString)
}

function showTemperature(temperatureString) {
    show('temperature-element', temperatureString)
}

function onCityChange(fn) {
    const element = document.getElementById('city-input');
    const debouncedFn = debounce(fn);

    element.addEventListener('input', (event) => debouncedFn(event.target.value));
}

function makeTimeString() {
    const now = new Date();

    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

function refreshClock() {
    showTime(makeTimeString());
}

async function findCity(cityName) {
    const request = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`
    );

    const data = await request.json();

    if (!data.results || data.results.length === 0) {
        return null;
    }

    let chosenCity = data.results[0];

    for (const place of data.results) {
        const chosenPopulation = chosenCity.population ?? -1;
        const placePopulation = place.population ?? -1;

        if (placePopulation > chosenPopulation) {
            chosenCity = place;
        }
    }

    return chosenCity;
}

async function loadWeather(lat, lon) {
    const request = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
    );

    const data = await request.json();
    return data.current.temperature_2m;
}

let activeCity = '';
let activeWeatherTimer = null;

async function renderWeather(cityName) {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
        showTemperature('');
        return;
    }

    try {
        const city = await findCity(trimmedCity);

        if (!city) {
            showTemperature('No such city');
            return;
        }

        const temperature = await loadWeather(city.latitude, city.longitude);
        showTemperature(`${temperature}°C`);
    } catch (error) {
        showTemperature('Unable to load weather');
    }
}

function restartWeatherUpdates(cityName) {
    activeCity = cityName;

    if (activeWeatherTimer !== null) {
        clearInterval(activeWeatherTimer);
    }

    renderWeather(activeCity);

    activeWeatherTimer = setInterval(() => {
        renderWeather(activeCity);
    }, 60000);
}

refreshClock();
setInterval(refreshClock, 1000);

onCityChange((cityName) => {
    restartWeatherUpdates(cityName);
});