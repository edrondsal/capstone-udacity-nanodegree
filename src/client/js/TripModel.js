/*--------------------------------------------------------
Trip Model code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 14/06/20
last modified: 14/06/20
Updates:
14/06/20    File Creation
15/06/20    Major Version - Unit Test Validated
21/06/20    Add weather information
author: E. RONDON
----------------------------------------------------------*/

import { Weather } from './WeatherModel';

/**
* @description Prototype Constructor of the Trip Model
* @param {String} city - The City of the trip
* @param {String} country - The country of the trip
* @param {long} departure - departure date in milliseconds since 1970
* @param {long} arrival - return date in milliseconds since 1970
* @param {String} imageUrl - The image url of the city or the country
* @param {double} latitude - The latitude of the city
* @param {double} longitude - The longitude of the city
*/
function Trip(city,country,departure,arrival, imageUrl,latitude,longitude){
    this.city = city;
    this.country = country;
    this.departure = departure;
    this.arrival = arrival;
    this.imageUrl = imageUrl;
    this.latitude = latitude;
    this.longitude = longitude;
    this.weatherData = [];
}
/**
* @description Function to test if a photo has been assigned to the trip
*/
Trip.prototype.hasImageUrl = function(){
    return this.imageUrl!=undefined && !!this.imageUrl;
}
/**
* @description Function to know how many days remain to the departure date
*/
Trip.prototype.remainingDaysToTrip = function(){
    const currentDate = Date.now();
    return Math.round((this.departure - currentDate)/86400000);
}
/**
* @description Function to calculate the duration of the trip in days
*/
Trip.prototype.duration = function(){
    return Math.round((this.arrival - this.departure)/86400000);
}
/**
* @description Function returning the title of the type wheather research that can be done
*/
Trip.prototype.weatherType = function(){
    const remainingDaysToTrip = this.remainingDaysToTrip();
    if(remainingDaysToTrip>7){
        return `The weather prediction for the next ${this.weatherPredictionLength()} days are`;
    }
    if(remainingDaysToTrip>1){
        return 'The current weather is';
    }
    return `The weather prediction for the next ${this.weatherPredictionLength()} days are`;
}
/**
* @description Function to calculate how many days are needed to forecast with the weather api
*/
Trip.prototype.weatherPredictionLength = function(){
    const remainingDaysToTrip = this.remainingDaysToTrip();
    if(remainingDaysToTrip>7){
        return Math.min(7,this.duration());
    }
    if(remainingDaysToTrip>1){
        return 0;
    }
    return Math.min(16,this.duration());   
}
/**
* @description Function that return the latitude and longiture query for the weather api
*/
Trip.prototype.weatherForecastLatLong = function(){
    return `&lat=${this.latitude}&lon=${this.longitude}`;
}
/**
* @description Function add weatherdata to the trip
* @param {double} temperature - The mean temperature
* @param {String} icon - The weather icon code
* @param {String} code - The weather code
* @param {String} description - The text weather description
*/
Trip.prototype.addWeatherInfo = function(temperature,icon,code,description){
    const data = new Weather(temperature,icon,code,description);
    this.weatherData.push(data);
}
/**
* @description Function add weatherdata to the trip
* @param {Weather} data - The weather object
*/
Trip.prototype.addWeatherData = function(data){
    this.weatherData.push(data);
}
/**
* @description Function add weatherdata to the trip
* @param {[Weather]} data - The array of weather objects
*/
Trip.prototype.setWeatherData = function(data){
    this.weatherData = data;
}

export { Trip }