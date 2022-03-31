//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather =document.getElementById("currentWeather")
var Day5 =document.getElementById("5Day")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
function getCurrentCity(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

    fetch(apiUrl)
        .then(function(response){

            let data = response.json()
            return data
        })
        .then(function(data){
            console.log(data)

        })
}

getCurrentCity("milwaukee")
