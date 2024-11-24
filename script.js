const input = document.querySelector('input')
const button = document.querySelector('button')
const sendBtn = document.querySelector('.sendBtn')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const langBtn = document.querySelector('.lang')
const headings = document.querySelector('.headings')
const headingsPL = document.querySelector('.headings-pl')
const title = document.querySelector('.title')
let statusPL
let statusENG
let lang = 'ENG'
let errorMsg

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=2006bf9b4f39c946e094ce1662c2b5d1'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value
	const cityDown = city.toLowerCase()
	const cityProper = cityDown.charAt(0).toUpperCase() + cityDown.slice(1).toLowerCase()
	console.log(cityProper)
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			console.log(`${city}:Temp wynosi ${temp}, a hum ${hum}`)
			const status = res.data.weather[0].main
			console.log(status)

			warning.textContent = ''
			input.value = ''
			cityName.textContent = cityProper
			temperature.textContent = Math.floor(temp) + '°' + 'C'
			humidity.textContent = hum + '%'
			weather.textContent = status
			statusENG = status

			if (status == 'Clouds') {
				photo.setAttribute('src', './img/cloud.png'), (statusPL = 1)
			} else if (status == 'Clear') photo.setAttribute('src', './img/sun.png'), (statusPL = 2)
			else if (status == 'Atmosphere') photo.setAttribute('src', './img/fog.png'), (statusPL = 3)
			else if (status == 'Snow') photo.setAttribute('src', './img/ice.png'), (statusPL = 4)
			else if (status == 'Rain') photo.setAttribute('src', './img/rain.png'), (statusPL = 5)
			else if (status == 'Drizzle') photo.setAttribute('src', './img/drizzle.png'), (statusPL = 6)
			else if (status == 'Thunderstorm') photo.setAttribute('src', './img/thunderstorm.png'), (statusPL = 7)
			else {
				photo.setAttribute('src', './img/unknown.png')
			}
			errorMsg = 0
			warning.textContent = ''
			langCheck()
		})

		.catch(error => {
			if (lang === 'PL') {
				warning.textContent = 'Wpisz poprawną nazwę miasta'
			} else {
				warning.textContent = 'Please enter the correct city name'
			}
			console.log('Wystąpił błąd:', error) // Wypisuje szczegóły błędu
			errorMsg = 1 // Przypisuje wartość 1 do zmiennej error
			console.log(errorMsg)
		})
}

const enterCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

const langCheckBtn = e => {
	console.log('Kliknięto:', e.target.textContent)
	if (e.target.textContent === 'PL') {
		e.target.textContent = 'ENG'
		lang = 'ENG'
		console.log('Język ustawiony na:', lang)
	} else {
		e.target.textContent = 'PL'
		lang = 'PL'
		console.log('Język ustawiony na:', lang)
	}

	langCheck()
}

const langCheck = () => {
	if (lang === 'PL') {
		// Ukrywianie i pojawianie się  Pl/Eng  zależności od zmiennej lang
		headingsPL.style.display = 'flex' // Ustawienie divu  PL na widoczny
		headings.style.display = 'none' // Ukrycie divu ENG
		title.textContent = 'pogoda'
		sendBtn.textContent = 'wyślij'
		input.setAttribute('placeholder', 'Wpisz nazwe miasta...')
		if (statusPL === 1) {
			weather.textContent = 'Pochmurnie'
		} else if (statusPL === 2) {
			weather.textContent = 'Słonecznie'
		} else if (statusPL === 3) {
			weather.textContent = 'Mgła'
		} else if (statusPL === 4) {
			weather.textContent = 'Śnieg'
		} else if (statusPL === 5) {
			weather.textContent = 'Deszcz'
		} else if (statusPL === 6) {
			weather.textContent = 'Mrzawka'
		} else if (statusPL === 7) {
			weather.textContent = 'Burza'
		}

		if (errorMsg === 1) {
			warning.textContent = 'Wpisz poprawną nazwę miasta'
		}
	} else if (lang === 'ENG') {
		// Ukryj div dla PL, wyświetl div dla ENG
		headingsPL.style.display = 'none' // Ukrycie divu PL
		headings.style.display = 'flex' // Ustawienie divu ENG na widoczny
		title.textContent = 'weather app'
		sendBtn.textContent = 'send'
		input.setAttribute('placeholder', 'Enter the name of the city...')
		weather.textContent = statusENG
		if (errorMsg === 1) {
			warning.textContent = 'Please enter the correct city name'
		}
	}

	console.log(errorMsg)
}

console.log(lang)

input.addEventListener('keyup', enterCheck)
button.addEventListener('click', getWeather)
langBtn.addEventListener('click', langCheckBtn)

document.addEventListener(
	'DOMContentLoaded',
	langCheck()
	// Wywołanie funkcji, która ustawia widoczność divów
)
