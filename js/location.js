//if user blocks the location the browser will show the weather in Arvada, CO
//post weather pin by location
if(window.screen.width >= 800) {
navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude.toFixed(2)
    longitude = position.coords.longitude.toFixed(2)
    
    console.log(`latitude: ${latitude}`)
    console.log(`longitude: ${longitude}`)
    
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8d951c4a64c1ff61cefb8b4921b9e37e`
    
    fetchData(url, handleData)
    //set interval to update weather every 30 min
    setInterval(() => {
        fetchData(url, handleData)
    }, 1800000)
  
})
}else {
    console.log('no location and weather pin, the screen is too small')
}



