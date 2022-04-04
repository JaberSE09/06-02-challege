//global
var cityText = document.getElementById("cityText")
var searchBtn = document.getElementById("search")
var recentSearch = document.getElementById("recentSearch")
var currentWeather = document.getElementById("currentWeather")
var Day5 = document.getElementById("5Day")
var weather = document.getElementById("weather")
const key = "6d9f0ee409c3a4bbba290561246ccf25"
var time = moment().format('(M/D/Y)');
var localArray = []
var search = JSON.parse(localStorage.getItem("searches"))







function getCurrentCity(city) {


    //openweathermap api
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

    fetch(apiUrl)
        .then(function (response) {

            //json the data
            return response.json()

        })
        .then(function (data) {

            currentWeather.innerHTML = ""

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

                    Day5.innerHTML = ""

                    for (let i = 0; i < 5; i++) {
                        const dailyCard = document.createElement("div")
                        dailyCard.innerHTML = `
                        <div class="p-2 m-2 card bg-info text-blac">
                        <h5>${moment().add(i + 1, "days").format("MM/DD/YYYY")}</h5>
                        <img src ="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="weather" class="mx-auto">
                        <p> Temp: ${data.daily[i].temp.day} °F
                        <p>Humidity: ${data.daily[i].humidity} %</p>

                        </div>
                        `
                        Day5.appendChild(dailyCard)
                        setLocalStograge(city)

                    }




                })

        })
        .catch(function (error) {
            console.log(error)
        })
}




getLocalStorage()
getCurrentCity("San Diego")

searchBtn.addEventListener("click", function () {
    getCurrentCity(cityText.value.trim())
})


function setLocalStograge(city) {
    localArray.push(search)
    if (localArray.includes(city)) {
        return;
    } else {
        localArray.push(city);

        // Stores for next user visit
        localStorage.setItem("searches", JSON.stringify(localArray));
        console.log(localStorage)
        // Calls updateSearchHistory to add new search to previous search buttons
        
    }
    getLocalStorage();
}



function squash(arr) {
    let unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);
    return unique

}

function getLocalStorage() {

    search = squash(search)
    console.log(search)




    if (search != null) {
        recentSearch.innerText=""
        for (let i = 0; i < search.length; i++) {
            const button = document.createElement("button")
            button.classList.add("m-2", "btn", "btn-primary", "col-12" , "row-cols-1")
            button.innerHTML = search[i]
            button.addEventListener("click", function () {
                getCurrentCity(search[i])
            }
            )


            recentSearch.appendChild(button)
        }
    }
}