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
    weather.style.border = "2px solid black"


    //openweathermap api
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

    fetch(apiUrl)
        .then(function (response) {

            //json the data
            return response.json()

        })
        .then(function (data) {


            //onecall the url
            const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${key}`
            //display title
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



                    //display current weather data
                    var tempEl = document.createElement("p")
                    var windEl = document.createElement("p")
                    var humEl = document.createElement("p")
                    var uvEl = document.createElement("p")


                    tempEl.innerHTML = "Temp: " + Math.floor(data.current.temp) + "°F"

                    windEl.innerHTML = "wind: " + data.current.wind_speed + " MPH"

                    humEl.innerHTML = "Humidity: " + data.current.humidity + " %"


                    currentWeather.appendChild(tempEl)
                    currentWeather.appendChild(windEl)
                    currentWeather.appendChild(humEl)


                    const uvi = Math.floor(data.current.uvi)

                    if (uvi <= 2) {
                        uvEl.innerHTML = `UV Index: <button class="btn btn-info uv">${uvi}</button>`
                    } else if (uvi > 2 && uvi <= 5) {
                        uvEl.innerHTML = `UV Index: <button class="btn btn-success uv">${uvi}</button>`;
                    } else if (uvi > 5 && uvi <= 8) {
                        uvEl.innerHTML = `UV Index: <button class="btn btn-warning uv">${uvi}</button>`;
                    } else {
                        uvEl.innerHTML = `UV Index: <button class="btn btn-danger uv">${uvi}</button>`;
                    }

                    currentWeather.appendChild(uvEl)

                    Day5.innerHTML=""

                    for (let i = 0; i < 5; i++) {
                        const dailyCard = document.createElement("div")
                        dailyCard.innerHTML=`
                        <div class="p-2 m-2 card bg-info text-white">
                        <h5>${moment().add(i + 1, "days").format("MM/DD/YYYY")}</h5>
                        <img src ="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="weather" class="mx-auto">

                        </div>
                        `
                        Day5.appendChild(dailyCard)
                        
                    }



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