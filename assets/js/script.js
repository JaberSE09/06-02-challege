//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather = document.getElementById("currentWeather")
var Day5 = document.getElementById("5Day")
var weather = document.getElementById("weather")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
var time = moment().format('(M/D/Y)');

function getCurrentCity(city) {
    currentWeather.replaceChildren()
    currentWeather.style.border="2px solid black"


    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

    fetch(apiUrl)
        .then(function (response) {

            return response.json()

        })
        .then(function (data) {


            const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${key}`
            var titleEl = document.createElement("h1")
            titleEl.style.fontWeight = "bold"

            titleEl.innerHTML = data.name + time


            var icon = document.createElement("img")
            icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            titleEl.appendChild(icon)
            currentWeather.appendChild(titleEl)

            fetch(oneCallUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {



                    var tempEl = document.createElement("p")
                    var windEl = document.createElement("p")
                    var humEl = document.createElement("p")
                    var uvEl = document.createElement("p")


                    tempEl.innerHTML ="Temp: " + Math.floor(data.current.temp)+ "°F"

                    // windEl.innerHTML= "wind: " + data.wind.speed + " MPH"

                    // humEl.innerHTML ="Humidity: " + data.main.humidity + " %"

                    // uvEl.innerHTML= "UV Index: " 

                    currentWeather.appendChild(tempEl)
                    // currentWeather.appendChild(windEl)
                    // currentWeather.appendChild(humEl)
                    // currentWeather.appendChild(uvEl)
                    console.log(data)

                    console.log(data)
                })


        })
        .catch(function (error) {
            console.log(error)
        })
}


getCurrentCity("San Diego")

searchBtn.addEventListener("click", function () {
    getCurrentCity(cityText.value.trim())
}
)