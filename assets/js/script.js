//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather =document.getElementById("currentWeather")
var Day5 =document.getElementById("5Day")
var weather = document.getElementById("weather")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
var time = moment().format('(M/D/Y)');
var titleEl= document.createElement("h1")

function getCurrentCity() {
    let city = cityText.value.trim()
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    fetch(apiUrl)
        .then(function(response){

            let data = response.json()
            return data
        })
        .then(function(data)
        {
            if(titleEl.innerHTML){
                currentWeather.removeChild(titleEl)
            }
            weather.style.border="2px solid black"
            titleEl = document.createElement("h1")
            titleEl.innerHTML = data.name + time
            currentWeather.appendChild(titleEl)
            console.log(data)


        })
        .catch(function(error){
            console.log(error)
        })
}

searchBtn.addEventListener("click", getCurrentCity)