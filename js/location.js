//using geolocation if user enables it
function handleWidthChangeForLocalWeather() {
    if (widthMatchForWeather.matches) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude.toFixed(2)
            longitude = position.coords.longitude.toFixed(2)

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8d951c4a64c1ff61cefb8b4921b9e37e`

            fetchData(url, handleData)
            //set interval to update weather every 30 min
            interval = setInterval(() => {
                fetchData(url, handleData)
            }, 1800000)
            
        })
    } else {
        stopTimer(interval)
        
    }
}

handleWidthChangeForLocalWeather()

widthMatchForWeather.addEventListener('change', handleWidthChangeForLocalWeather)
    


