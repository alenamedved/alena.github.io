const widthMatchForWeather = window.matchMedia("(min-width: 801px)")

//create DOM element to work with
const weatherDiv = document.querySelector('.weather')
const weatherParagraph = document.createElement('p')
//declare a variable that will be assigned a value of setInterval so it can be stopped later after certain condition met
let interval

const urlArvada = 'https://api.openweathermap.org/data/2.5/weather?id=5412199&units=imperial&appid=8d951c4a64c1ff61cefb8b4921b9e37e'

//function to create a weather pin and append it to the DOM
function handleData(localWeather) {
    
    weatherParagraph.innerHTML = `<p>Current weather in &nbsp;</p> 
    <p>${localWeather.name}:&nbsp;</p> 
    <p><b>${localWeather.weather[0].main}</b>&nbsp;</p> 
    <p>${localWeather.main.temp}F</p>
    <img src='https://openweathermap.org/img/w/${localWeather.weather[0].icon}.png' alt='weather at Arvada, CO'>`
    
    weatherDiv.appendChild(weatherParagraph)
       
}

//function to start interval to update the weather every 30min
function startTimer() {
    interval = setInterval(() => {
        fetchData(urlArvada, handleData)
        
    }, 1800000)
}

//function to clear a timer
function stopTimer() {
    clearInterval(interval)
}

//consider a screen width, if it's wider then 801px - the user will see a weather pin 
function handleWidthChangeForWeather() {
    if (widthMatchForWeather.matches) {
        
        //upload the weather data and insert it to the DOM
        fetchData(urlArvada, handleData)
        //update the weather every 30mins
        startTimer()

    } else {
        stopTimer(interval)
        
    }
}

//run the function once
handleWidthChangeForWeather()

//add a function as a listener 
widthMatchForWeather.addEventListener('change', handleWidthChangeForWeather)
