//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather =document.getElementById("currentWeather")
var Day5 =document.getElementById("5Day")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
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
            let title = document.createElement("h1")
            title.innerHTML=data.name
            currentWeather.appendChild(title)         
            console.log(data.name)


        })
}

searchBtn.addEventListener("click", getCurrentCity)