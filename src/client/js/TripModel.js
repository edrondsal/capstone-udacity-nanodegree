/*--------------------------------------------------------
Trip Model code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 14/06/20
last modified: 14/06/20
Updates:
14/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/

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
}
Trip.prototype.hasImageUrl = function(){
    return this.imageUrl!=undefined && !!this.imageUrl;
}
Trip.prototype.remainingDaysToTrip = function(){
    const currentDate = Date.now();
    return Math.round((this.departure - currentDate)/86400000);
}
Trip.prototype.duration = function(){
    return Math.round((this.arrival - this.departure)/86400000);
}
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
Trip.prototype.weatherPredictionLength = function(){
    if (this.remainingDaysToTrip()<=1){
        return Math.min(16,this.duration());
    }
    return Math.min(7,this.duration());
}
Trip.prototype.weatherForecastLatLong = function(){
    return `&lat=${this.latitude}&lon=${this.longitude}`;
}

export { Trip }