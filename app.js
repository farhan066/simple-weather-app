///====Elements====///
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const cityName = document.querySelector(".cityName")

const search_box = document.querySelector(".search_box");
const search_btn = document.querySelector(".search_btn");
const location_btn = document.querySelector(".location_btn");

const error = document.querySelector(".errorBox")
//====API====/
const apiKey = `b03912766emshdd00c6495a79ebbp1a5ac3jsn134f571f3c60`
const apiKeyName = `X-RapidAPI-Key`
const apiHost = `weather-by-api-ninjas.p.rapidapi.com`
const apiHostName = `X-RapidAPI-Host`

const header = {
    method: "GET",
    headers: {
        "X-RapidAPI-Host": apiHost,
        "X-RapidAPI-Key": apiKey
    }
}

const getWeather = (city) => {

    cityName.innerHTML = "loading..."
    fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, header)

        .then(response => {
            return response.json()
        })

        .then(result => {

            if (result.error == "An unexpected error occured.") {
                error.classList.add("showError")
                setTimeout(() => {
                    error.classList.remove("showError")
                }, 2000);
                return;
            }
            cityName.innerHTML = city

            temp.innerHTML = result.temp
            humidity.innerHTML = result.humidity
            wind.innerHTML = result.wind_speed

        })

        .catch(error => console.log(error))

}



search_btn.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(search_box.value)
})


location_btn.addEventListener("click", (e) => {
    e.preventDefault()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${latitude}&lon=${longitude}`, header)

                .then(response => {
                    return response.json()
                })

                .then(result => {

                    if (result.error == "An unexpected error occured.") {
                        error.classList.add("showError")
                        setTimeout(() => {
                            error.classList.remove("showError")
                        }, 2000);
                        return;
                    }
                    cityName.innerHTML = "*Current Location*"

                    temp.innerHTML = result.temp
                    humidity.innerHTML = result.humidity
                    wind.innerHTML = result.wind_speed

                })

                .catch(error => console.log(error))
        })

    } else {
        alert("Your browser does not support geolocation")
    }
})


console.warn("This project is done by Farhan")