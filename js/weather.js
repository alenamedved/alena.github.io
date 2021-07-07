const weather = new XMLHttpRequest()
weather.onreadystatechange = function() {
    if(weather.readyState === 4) {
        const localWeather = JSON.parse(weather.response)
        const weatherDiv = document.querySelector('.weather')
        let weatherParagraph = document.createElement('p')
        let img = document.createElement('img')
        let temp = `${Math.round((localWeather.main.temp - 273.15) * 9/5 + 32)}F`
        
        img.src = `https://openweathermap.org/img/w/${localWeather.weather[0].icon}.png`
              
        weatherParagraph.innerHTML = `<p>Current weather in &nbsp;</p> <p>${localWeather.name}:&nbsp;</p> <p><b>${localWeather.weather[0].main}</b>&nbsp;</p> <p>${temp}</p>`
        weatherParagraph.appendChild(img)
       
        weatherDiv.appendChild(weatherParagraph)
    }
}
weather.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=5412199&appid=8d951c4a64c1ff61cefb8b4921b9e37e')
weather.send()