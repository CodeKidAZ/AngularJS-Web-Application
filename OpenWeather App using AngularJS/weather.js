var refreshBit = 0;
var tempArray=[];
var humidityArray=[];
var windspeedArray=[];
var cloudinessArray=[];

var myApp = angular.module("weatherApp",['ngRoute']);

var forecastObject ={
    city: '',
    countrycode: "",

    temp: "",
    tempmin: "",
    tempmax: "",
    pressure: "",
    sealevel: "",
    groundlevel: "",
    humidity:"",

    weatherMain:"",
    weatherDescription:""
}

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl:'snair9_lab5_task2a.html',
            controller: 'WeatherController',
            controllerAs: 'cities'

        })
        .when('/PhoenixForecast', {
            templateUrl:'forecastPhoenix.html',
            controller: 'forecastPhoenixController',
            controllerAs: 'phoenix'
        })
        .when('/LondonForecast', {
            templateUrl:'forecastLondon.html',
            controller: 'forecastLondonController',
            controllerAs: 'london'
        })
        .when('/TokyoForecast', {
            templateUrl:'forecastTokyo.html',
            controller: 'forecastTokyoController',
            controllerAs:'tokyo'
        })
        .otherwise({
            redirectTo: '/home'
        })
})

//__________________________________________________________________CONTROLLER PHOENIX
myApp.controller('forecastPhoenixController', function ($http) {

    this.forecast = forecastObject;

    var retrieveData = function (loc)
    {
        var website = "http://api.openweathermap.org/data/2.5/forecast?q="
        var location = loc;
        var forecastDays = "&mode=json&cnt=" +1;
        var appID = "&APPID=";
        var myKey = "b080b39a058d0f3c955bdde5de696597";
        var url = website + location + forecastDays + appID + myKey;
        console.log(url)
        $http.get(url)
            .then(function successCallback(response) {
                cityRecievedObject = response.data;
                console.log(JSON.stringify(cityRecievedObject));

                forecastObject.city = cityRecievedObject.city.name;
                forecastObject.countrycode = cityRecievedObject.city.country;
                forecastObject.temp = kelvinToCelcius(cityRecievedObject.list[0].main.temp);
                forecastObject.tempmin = kelvinToCelcius(cityRecievedObject.list[0].main.temp_min);
                forecastObject.tempmax = kelvinToCelcius(cityRecievedObject.list[0].main.temp_max);
                forecastObject.pressure = cityRecievedObject.list[0].main.pressure;
                forecastObject.sealevel = cityRecievedObject.list[0].main.sea_level;
                forecastObject.groundlevel = cityRecievedObject.list[0].main.grnd_level;
                forecastObject.humidity = cityRecievedObject.list[0].main.humidity;
                forecastObject.weatherMain = cityRecievedObject.list[0].weather[0].main;
                forecastObject.weatherDescription = cityRecievedObject.list[0].weather[0].description;

            }, function errorCallback(response) {
                console.log("SERVER ERROR " + response);
            });
    }
    retrieveData("Phoenix");

});

//_______________________________________________________________________CONTROLLER LONDON
myApp.controller('forecastLondonController', function ($http) {

    this.forecast = forecastObject;
    var retrieveData = function (loc)
    {
        var website = "http://api.openweathermap.org/data/2.5/forecast?q="
        var location = loc;
        var forecastDays = "&mode=json&cnt=" +1;
        var appID = "&APPID=";
        var myKey = "b080b39a058d0f3c955bdde5de696597";
        var url = website + location + forecastDays + appID + myKey;
        console.log(url)
        $http.get(url)
            .then(function successCallback(response) {
                cityRecievedObject = response.data;
                console.log(JSON.stringify(cityRecievedObject));

                forecastObject.city = cityRecievedObject.city.name;
                forecastObject.countrycode = cityRecievedObject.city.country;
                forecastObject.temp = kelvinToCelcius(cityRecievedObject.list[0].main.temp);
                forecastObject.tempmin = kelvinToCelcius(cityRecievedObject.list[0].main.temp_min);
                forecastObject.tempmax = kelvinToCelcius(cityRecievedObject.list[0].main.temp_max);
                forecastObject.pressure = cityRecievedObject.list[0].main.pressure;
                forecastObject.sealevel = cityRecievedObject.list[0].main.sea_level;
                forecastObject.groundlevel = cityRecievedObject.list[0].main.grnd_level;
                forecastObject.humidity = cityRecievedObject.list[0].main.humidity;
                forecastObject.weatherMain = cityRecievedObject.list[0].weather[0].main;
                forecastObject.weatherDescription = cityRecievedObject.list[0].weather[0].description;

            }, function errorCallback(response) {
                console.log("SERVER ERROR " + response);
            });
    }
    retrieveData("London");
});

//________________________________________________________________CONTROLLER TOKYO
myApp.controller('forecastTokyoController', function ($http) {
    this.forecast = forecastObject;
    var retrieveData = function (loc)
    {
        var website = "http://api.openweathermap.org/data/2.5/forecast?q="
        var location = loc;
        var forecastDays = "&mode=json&cnt=" +1;
        var appID = "&APPID=";
        var myKey = "b080b39a058d0f3c955bdde5de696597";
        var url = website + location + forecastDays + appID + myKey;
        console.log(url)
        $http.get(url)
            .then(function successCallback(response) {
                cityRecievedObject = response.data;
                console.log(JSON.stringify(cityRecievedObject));

                forecastObject.city = cityRecievedObject.city.name;
                forecastObject.countrycode = cityRecievedObject.city.country;
                forecastObject.temp = kelvinToCelcius(cityRecievedObject.list[0].main.temp);
                forecastObject.tempmin = kelvinToCelcius(cityRecievedObject.list[0].main.temp_min);
                forecastObject.tempmax = kelvinToCelcius(cityRecievedObject.list[0].main.temp_max);
                forecastObject.pressure = cityRecievedObject.list[0].main.pressure;
                forecastObject.sealevel = cityRecievedObject.list[0].main.sea_level;
                forecastObject.groundlevel = cityRecievedObject.list[0].main.grnd_level;
                forecastObject.humidity = cityRecievedObject.list[0].main.humidity;
                forecastObject.weatherMain = cityRecievedObject.list[0].weather[0].main;
                forecastObject.weatherDescription = cityRecievedObject.list[0].weather[0].description;

            }, function errorCallback(response) {
                console.log("SERVER ERROR " + response);
            });
    }

    retrieveData("Tokyo");
});

myApp.controller('WeatherController', function ($http) {
    console.log("WeatherController running")
    document.getElementById("dropDownList").style.visibility = "hidden";

    this.phoenix = phoenixCity;
    this.phoenixDiff = phoenix2;

    this.london = londonCity;
    this.londonDiff = london2;

    this.tokyo = tokyoCity;
    this.tokyoDiff = tokyo2;

    var retrieveData = function (loc)
    {
        var website = "http://api.openweathermap.org/data/2.5/weather?q="
        var location = loc;
        var appID = "&APPID=";
        var myKey = "b080b39a058d0f3c955bdde5de696597";
        var url = website + location + appID + myKey;
        $http.get(url)
            .then(function successCallback(response)
            {
                cityRecievedObject = response.data;
                var cityKey = cityRecievedObject.name;
                console.log("New "+cityKey + " is now added");

                var cityValue = JSON.stringify(cityRecievedObject);
                localStorage.setItem(cityKey,cityValue);
                console.log("LocalStorage now: "+localStorage.length);
                if(cityKey == "Phoenix")
                {
                    if(refreshBit==1){//if refresh is clicked
                        console.log("RefreshBit: "+refreshBit + " so populateRow2");
                        populateRow2(cityKey);
                    }
                    else{
                        populateRow1("Phoenix");
                    }
                }
                else if(cityKey == "London")
                {
                    if(refreshBit==1){//if refresh is clicked
                        console.log("RefreshBit: "+refreshBit + " so populateRow4");
                        populateRow4(cityKey);
                    }
                    else{
                        populateRow3("London");
                    }
                }
                else if(cityKey == "Tokyo")
                {
                    if(refreshBit==1){//if refresh is clicked
                        console.log("RefreshBit: "+refreshBit + " so populateRow6");
                        populateRow6(cityKey);
                    }
                    else{
                        populateRow5("Tokyo");
                    }
                }

            }, function errorCallback(response) {
                console.log("SERVER ERROR "+response);
            });

    }

    //________________________________________________PHOENIX
    if (localStorage.getItem("Phoenix")) {
        console.log("PHOENIX IN STORAGE is below");
        populateRow1("Phoenix");
    }
    else{
        console.log("PHOENIX NOT IN STORAGE");
        retrieveData("Phoenix");
    }
    //________________________________________________PHOENIX DIFF
    if (localStorage.getItem("PhoenixDiff")) {
        console.log("PHOENIX DIFF IN STORAGE is below");
        populateRow2("PhoenixDiff");
    }
    else {
        console.log("PHOENIX DIFF NOT IN STORAGE");
    }

    //________________________________________________LONDON
    if (localStorage.getItem("London")) {
        console.log("LONDON IN STORAGE is below");
        populateRow3("London");
    }
    else{
        console.log("LONDON NOT IN STORAGE");
        retrieveData("London");
    }
    //_________________________________________________LONDON DIFF
    if (localStorage.getItem("LondonDiff")) {
        console.log("LONDON DIFF IN STORAGE is below");
        populateRow4("LondonDiff");
    }
    else {
        console.log("LONDON DIFF NOT IN STORAGE");
    }

    //________________________________________________TOKYO
    if (localStorage.getItem("Tokyo")) {
        console.log("TOKYO IN STORAGE is below");
        populateRow5("Tokyo");
    }
    else{
        console.log("TOKYO NOT IN STORAGE");
        retrieveData("Tokyo");
    }
    //________________________________________________AND TOKYO DIFF
    if (localStorage.getItem("TokyoDiff")) {
        console.log("TOKYO DIFF IN STORAGE is below");
        populateRow6("TokyoDiff");
    }
    else {
        console.log("TOKYO DIFF NOT IN STORAGE");
    }


    //===================================================================================FUNCTIONS
    this.clearLocalStorage = function(){
        localStorage.clear();
        console.log("LOCAL STORRAGE IS: "+localStorage.length);
    }
    this.refreshWithRandomData = function () {
        console.log("RefreshBit was: "+refreshBit); //refreshBit must be 0 before doing refresh
        refreshBit = 1;

        localStorage.removeItem("Phoenix"); //will now remove phoenix and
        retrieveData("Phoenix"); // fetch new phoenix data for finding the difference

        localStorage.removeItem("London");
        retrieveData("London");

        localStorage.removeItem("Tokyo");
        retrieveData("Tokyo");

        averageTemperature();

    }
});
//__________________________________________________________POPULATE ALL ROWS
function populateRow1(city) {
    var getCityP = JSON.parse(localStorage.getItem(city));
    console.log("ROW1: "+ getCityP);

    phoenixCity.name = getCityP.name;
    phoenixCity.countrycode = getCityP.sys.country;
    londonCity.timestamp = getCityP.dt;
    phoenixCity.timestampCurrent = epochToCurrent(getCityP.dt);
    phoenixCity.temperature = kelvinToCelcius(getCityP.main.temp);
    phoenixCity.humidity = getCityP.main.humidity
    phoenixCity.windspeed = meterToMiles(getCityP.wind.speed);
    phoenixCity.cloudiness = getCityP.clouds.all;

    console.log("");
}
function populateRow2(city){
    var getCityP2 = JSON.parse(localStorage.getItem(city));
    console.log("ROW2: "+ getCityP2.name);

    phoenix2.name=getCityP2.name+"Diff";
    phoenix2.countrycode = getCityP2.sys.country;
    phoenix2.timestampCurrent = epochToCurrent(phoenixCity.timestamp-getCityP2.dt);
    phoenix2.temperature = phoenixCity.temperature - kelvinToCelcius(getCityP2.main.temp);
    phoenix2.humidity = phoenixCity.humidity - getCityP2.main.humidity;
    phoenix2.windspeed = phoenixCity.windspeed - meterToMiles(getCityP2.wind.speed);
    phoenix2.cloudiness = phoenixCity.cloudiness -  getCityP2.clouds.all;
    localStorage.setItem("PhoenixDiff",JSON.stringify(getCityP2));

    if( phoenix2.temperature>=0){
        phoenix2.temperature= "+"+ phoenix2.temperature;
    }
    if(phoenix2.humidity>=0){
        phoenix2.humidity = "+"+phoenix2.humidity;
    }
    if(phoenix2.windspeed>=0){
        phoenix2.windspeed = "+"+phoenix2.windspeed;
    }
    if(phoenix2.cloudiness>=0){
        phoenix2.cloudiness = "+"+phoenix2.cloudiness;
    }

    console.log("");

}

function populateRow3(city) {
    var getCityL = JSON.parse(localStorage.getItem(city));
    console.log("ROW3: "+getCityL.name);

    londonCity.name = getCityL.name;
    londonCity.countrycode = getCityL.sys.country;
    londonCity.timestamp = getCityL.dt;
    londonCity.timestampCurrent = epochToCurrent(getCityL.dt);
    londonCity.temperature = kelvinToCelcius(getCityL.main.temp);
    londonCity.humidity = getCityL.main.humidity
    londonCity.windspeed = meterToMiles(getCityL.wind.speed);
    londonCity.cloudiness = getCityL.clouds.all;

    console.log("");
}

function populateRow4(city){
    var getCityL2 = JSON.parse(localStorage.getItem(city));
    console.log("ROW4: "+ getCityL2.name);

    london2.name=getCityL2.name+"Diff";
    london2.countrycode = getCityL2.sys.country;
    london2.timestampCurrent =  epochToCurrent(londonCity.timestamp-getCityL2.dt);
    london2.temperature = londonCity.temperature - kelvinToCelcius(getCityL2.main.temp);
    london2.humidity = londonCity.humidity - getCityL2.main.humidity;
    london2.windspeed = londonCity.windspeed - meterToMiles(getCityL2.wind.speed);
    london2.cloudiness = londonCity.cloudiness -  getCityL2.clouds.all;

    localStorage.setItem("LondonDiff",JSON.stringify(getCityL2));

    if( london2.temperature>=0){
        london2.temperature= "+"+ london2.temperature;
    }
    if(london2.humidity>=0){
        london2.humidity = "+"+london2.humidity;
    }
    if(london2.windspeed>=0){
        london2.windspeed = "+"+london2.windspeed;
    }
    if(london2.cloudiness>=0){
        london2.cloudiness = "+"+london2.cloudiness;
    }

    console.log("");

}
function populateRow5(city) {
    var getCityT = JSON.parse(localStorage.getItem(city));
    console.log("ROW5: "+getCityT.name);

    tokyoCity.name = getCityT.name;
    tokyoCity.countrycode = getCityT.sys.country;
    tokyoCity.timestamp = getCityT.dt;
    tokyoCity.timestampCurrent = epochToCurrent(getCityT.dt);
    tokyoCity.temperature = kelvinToCelcius(getCityT.main.temp);
    tokyoCity.humidity = getCityT.main.humidity
    tokyoCity.windspeed = meterToMiles(getCityT.wind.speed);
    tokyoCity.cloudiness = getCityT.clouds.all;

    console.log("");
    averageTemperature();
}

function populateRow6(city){
    var getCityT2 = JSON.parse(localStorage.getItem(city));
    console.log("ROW6: "+ getCityT2.name);

    tokyo2.name=getCityT2.name+"Diff";
    tokyo2.countrycode = getCityT2.sys.country;
    tokyo2.timestampCurrent =  epochToCurrent(londonCity.timestamp-getCityT2.dt);
    tokyo2.temperature = tokyoCity.temperature - kelvinToCelcius(getCityT2.main.temp);
    tokyo2.humidity = tokyoCity.humidity - getCityT2.main.humidity;
    tokyo2.windspeed = tokyoCity.windspeed - meterToMiles(getCityT2.wind.speed);
    tokyo2.cloudiness = tokyoCity.cloudiness -  getCityT2.clouds.all;

    localStorage.setItem("TokyoDiff",JSON.stringify(getCityT2));

    if( tokyo2.temperature>=0){
        tokyo2.temperature= "+"+ tokyo2.temperature;
    }
    if(tokyo2.humidity>=0){
        tokyo2.humidity = "+"+tokyo2.humidity;
    }
    if(tokyo2.windspeed>=0){
        tokyo2.windspeed = "+"+tokyo2.windspeed;
    }
    if(tokyo2.cloudiness>=0){
        tokyo2.cloudiness = "+"+tokyo2.cloudiness;
    }

    console.log("");
}

var phoenixCity ={
    name: '',
    countrycode: "",
    timestamp:"",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}
var londonCity ={
    name: "",
    countrycode: "",
    timestamp:"",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}
var phoenix2 = {
    name: '',
    countrycode: "",
    timestamp: "",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}
var london2 = {
    name: '',
    countrycode: "",
    timestamp: "",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}

var tokyoCity ={
    name: '',
    countrycode: "",
    timestamp:"",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}
var tokyo2 = {
    name: '',
    countrycode: "",
    timestamp: "",
    timestampCurrent: "",
    temperature: "",
    humidity: "",
    windspeed: "",
    cloudiness: ""
}


//UTILITIES

function epochToCurrent(t){
    var unixEpoch =t;
    var fullCurrentTime = new Date( t * 1000)
    var shortCurrentTime = fullCurrentTime.getHours()+":"+fullCurrentTime.getMinutes()+":"+fullCurrentTime.getMilliseconds();
    //console.log(fullCurrentTime);
    return shortCurrentTime;
}

function kelvinToCelcius(k){
    var c = k- 273.15;
    return c.toFixed(3);
}

function meterToMiles(ws){
    var speedMilesPerHour = ws*2.4;
    return speedMilesPerHour.toFixed(0)
}
function averageTemperature(){

    tempArray[0]=phoenixCity.temperature;
    tempArray[1]=londonCity.temperature;
    tempArray[2]=tokyoCity.temperature;

    humidityArray[0]=phoenixCity.humidity;
    humidityArray[1]=londonCity.humidity;
    humidityArray[2]=tokyoCity.humidity;

    windspeedArray[0]=phoenixCity.windspeed;
    windspeedArray[1]=londonCity.windspeed;
    windspeedArray[2]=tokyoCity.windspeed;

    cloudinessArray[0]=phoenixCity.cloudiness;
    cloudinessArray[1]=londonCity.cloudiness;
    cloudinessArray[2]=tokyoCity.cloudiness;


    tempArray.sort(function(a, b){return a-b});
    humidityArray.sort(function(a, b){return a-b});
    windspeedArray.sort(function(a, b){return a-b});
    cloudinessArray.sort(function(a, b){return a-b});

    console.log(tempArray);
    console.log(humidityArray);
    console.log(windspeedArray);
    console.log(cloudinessArray);


    var avgTemp = ((parseInt(tempArray[0])+parseInt(tempArray[1])+parseInt(tempArray[2]))/3).toFixed(0);
    var avgHumidity = ((parseInt(humidityArray[0])+parseInt(humidityArray[1])+parseInt(humidityArray[2]))/3).toFixed(0);
    var avgWSpeed= ((parseInt(windspeedArray[0])+parseInt(windspeedArray[1])+parseInt(windspeedArray[2]))/3).toFixed(0);
    var avgCloud= ((parseInt(cloudinessArray[0])+parseInt(cloudinessArray[1])+parseInt(cloudinessArray[2]))/3).toFixed(0);

    console.log("AVG are : "+"TEMP: "+avgTemp + " "+"HUMID: "+avgHumidity+" "+"WS: "+avgWSpeed+ " "+"CLOUD: "+ avgCloud);

    var hottest ="";
    var humidest ="";
    var nicest ="";
    var worst ="";

    //City with higher than avg temp and also least cloudy should be very HOT
    if(phoenixCity.temperature >parseInt(avgTemp) && phoenixCity.cloudiness < parseInt(avgCloud))
    {
        hottest = phoenixCity.name;
    }
    else if(londonCity.temperature >parseInt(avgTemp) && londonCity.cloudiness < parseInt(avgCloud)){
        hottest = londonCity.name;
    }
    else if(tokyoCity.temperature >parseInt(avgTemp) && tokyoCity.cloudiness < parseInt(avgCloud)){
        hottest = tokyoCity.name;
    }


    //City with higher than avg humidty and also higher than avg windspeed will be most Humid
    if(phoenixCity.humidity >parseInt(avgHumidity) && phoenixCity.windspeed < parseInt(avgWSpeed))
    {
        humidest = phoenixCity.name;
    }
    else if(londonCity.humidity >parseInt(avgHumidity) && londonCity.windspeed < parseInt(avgWSpeed))
    {
        humidest = londonCity.name;
    }
    else if(tokyoCity.humidity >parseInt(avgHumidity) && tokyoCity.windspeed < parseInt(avgWSpeed))
    {
        humidest = tokyoCity.name;
    }

    //City whose weather is less than  avg weather should be PERFECT CONDITIONS
    if(phoenixCity.temperature < parseInt(avgTemp))
    {
        nicest = londonCity.name;
    }
    else if(londonCity.temperature < parseInt(avgTemp))
    {
        nicest = londonCity.name;
    }
    else if(tokyoCity.temperature < parseInt(avgTemp))
    {
        nicest = tokyoCity.name;
    }

    //city that has lowest wind and lowest cloud is the worst city
    if(phoenixCity.windspeed<parseInt(avgWSpeed) && phoenixCity.cloudiness<parseInt(avgCloud))
    {
        worst = phoenixCity.name;
    }
    if(londonCity.windspeed<parseInt(avgWSpeed) && londonCity.cloudiness<parseInt(avgCloud))
    {
        worst = londonCity.name;
    }
    if(tokyoCity.windspeed<parseInt(avgWSpeed) && tokyoCity.cloudiness<parseInt(avgCloud))
    {
        worst = tokyoCity.name;
    }

    console.log(humidest + " "+ avgHumidity);

    document.getElementById("temperature").innerHTML ="The average temperature is "+avgTemp+" and the hottest city is "+hottest;
    document.getElementById("humidity").innerHTML = "The average humidity is "+avgHumidity+" and the most humid city is "+humidest;
    document.getElementById("niceweather").innerHTML = "The city with the nicest weather is "+ nicest;
    document.getElementById("worstweather").innerHTML = "The city with the worst weather is "+ worst;

}
