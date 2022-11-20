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

let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours= now.getHours();
if(hours < 10){
  hours = `0${hours}`;
}


let minutes= now.getMinutes();
if(minutes < 10){
  minutes = `0${minutes}`; 

  
}


//console.log(`${day}  ${hours}:${minutes}`);
let currentDate = `${month} ${date}, ${day} ${hours}:${minutes}`;


let li = document.querySelector("#date");
li.innerHTML = currentDate;
//console.log(currentDate);

function formatDay(timestamp){

  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur","Fri","Sat"];

  return days[day];
}


function displayForecast(response){
  let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row" >`;

forecast.forEach(function (forecastDay, index){
  if(index<6){
forecastHTML = 
forecastHTML + 

  `
            <div class="col-2">
           <div class="card justify-content">
           <div class="card-body">

              <h3 class="weather-forecast-date">${formatDay(forecastDay.dt)}</h3>

<h5><span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</> -
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span></h5>


                <p class="card-text">${forecastDay.weather[0].main} </p>

              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="42"
              />
                 </div>
              </div>
            </div>
            `;
  }
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}



function getForecast(coordinates){
  console.log(coordinates);

  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}


function tempGeo(response) {

//to get actual name of city
document.querySelector("#city").innerHTML= response.data.name;
    
 //Current Temp
 celciusTemp =response.data.main.temp;
document.querySelector("#temperature").innerHTML =Math.round(celciusTemp);

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

getForecast(response.data.coord);

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

function displayFahrenheightTemp(event){
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  //removing active class for celcius link
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");


  let fhTemp = (celciusTemp * 9)/ 5 + 32;
  tempElement.innerHTML = Math.round(fhTemp);
  
}

function displayCelciusTemp(event){
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  //removing active class for fahrenheit link
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");

  tempElement.innerHTML = Math.round(celciusTemp);
}


//creating a global variable
let celciusTemp = null;




let selectCity = document.querySelector("#search-form");
selectCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click",getCurrentLocation);

let fahrenheit = document.querySelector("#fh-link");
fahrenheit.addEventListener("click", displayFahrenheightTemp);

let celcius = document.querySelector("#cl-link");
celcius.addEventListener("click", displayCelciusTemp);

searchCity("Kyrenia");
 
