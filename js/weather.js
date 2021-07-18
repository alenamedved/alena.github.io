//create DOM element to work with
if(window.screen.width >= 800) {
const weatherDiv = document.querySelector('.weather')
const weatherParagraph = document.createElement('p')

function handleData(localWeather) {
          
    weatherParagraph.innerHTML = `<p>Current weather in &nbsp;</p> 
        <p>${localWeather.name}:&nbsp;</p> 
        <p><b>${localWeather.weather[0].main}</b>&nbsp;</p> 
        <p>${localWeather.main.temp}F</p>
        <img src='https://openweathermap.org/img/w/${localWeather.weather[0].icon}.png' alt='local weather'>`

    weatherDiv.appendChild(weatherParagraph)

}

//upload the weather data and insert it to the DOM
fetchData('https://api.openweathermap.org/data/2.5/weather?id=5412199&units=imperial&appid=8d951c4a64c1ff61cefb8b4921b9e37e', handleData)
//update the weather every 30mins
setInterval(() => {
    fetchData('https://api.openweathermap.org/data/2.5/weather?id=5412199&units=imperial&appid=8d951c4a64c1ff61cefb8b4921b9e37e', handleData)

}, 1800000)
} else {
    console.log('no location and weather pin, the screen is too small')
}
