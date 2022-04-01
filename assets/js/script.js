//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather = document.getElementById("currentWeather")
var Day5 = document.getElementById("5Day")
var weather = document.getElementById("weather")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
var time = moment().format('(M/D/Y)');

function getCurrentCity() {
    let city = cityText.value.trim()
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

    fetch(apiUrl)
        .then(function (response) {

            let data = response.json()
            return data

        })
        .then(function (data) {


            const oneCallUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${key}`
            var icon = document.createElement("img")
            icon.setAttribute("src" , "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            
            var titleEl = document.createElement("h1")
            titleEl.style.fontWeight="bold"
            
            var tempEl = document.createElement("p")
            var windEl = document.createElement("p")
            var humEl = document.createElement("p")
            var uvEl = document.createElement("p")
            
            weather.style.border = "2px solid black"
            
            titleEl.innerHTML = data.name + time
            titleEl.appendChild(icon)
            
            windEl.innerHTML= "wind: " + data.wind.speed + " MPH"

            humEl.innerHTML ="Humidity: " + data.main.humidity + " %"

            uvEl.innerHTML= "UV Index: " 

            tempEl.innerHTML ="Temp: " + data.main.temp+ "°F"
            currentWeather.appendChild(titleEl)
            currentWeather.appendChild(tempEl)
            currentWeather.appendChild(windEl)
            currentWeather.appendChild(humEl)
            currentWeather.appendChild(uvEl)
            console.log(data)

            fetch(oneCallUrl)
            .then(function(response){
                response.json()
                return response
            })
            .then(function(data){
                console.log(data)
            })


        })
        .catch(function (error) {
            console.log(error)
        })
}

searchBtn.addEventListener("click",function() {
    currentWeather.replaceChildren()
    getCurrentCity()
}
    )