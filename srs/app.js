//Change Date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours= now.getHours();
if(hours < 10){
  hours = `0${hours}`;
}

let minutes= now.getMinutes();
if(minutes < 10){
  minutes = `0${minutes}`;
}


console.log(`${day}  ${hours}:${minutes}`);
let currentDate = `${day} ${hours}:${minutes}`;


let li = document.querySelector("#date");
li.innerHTML = currentDate;
console.log(currentDate);



function tempGeo(response) {

//to get actual name of city
document.querySelector("#city").innerHTML= response.data.name;
    
 //Current Temp
document.querySelector("#temperature").innerHTML =Math.round(response.data.main.temp);

//humidity
document.querySelector("#humidity").innerHTML =Math.round(response.data.main.temp);

//windspeed
document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);

//description
document.querySelector("#description").innerHTML = response.data.weather[0].description;
console.log(response.data.weather[0].description);

//weather icon
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);

}

//Change city name
function searchCity(city) {
let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(tempGeo);
}

function handleSubmit(event){
event.preventDefault();
let city = document.querySelector("#city-input").value;
searchCity(city);
}

  //get current location button
function showPosition(position) {
let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(tempGeo);

}
  function getCurrentLocation(event){
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(showPosition);

}


let selectCity = document.querySelector("#search-form");
selectCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click",getCurrentLocation);

searchCity("Kyrenia");
