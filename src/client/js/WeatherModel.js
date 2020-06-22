/*--------------------------------------------------------
View Model code for the App. UDACITY Project - Front End Developper Nanodegree
version: 0.0.1
created on: 21/06/20
last modified: 21/06/20
Updates:
21/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/

/**
* @description Prototype Constructor of the Weather Model
* @param {double} temperature - The mean temperature
* @param {String} icon - The weather icon code
* @param {String} code - The weather code
* @param {String} description - The text weather description
*/
function Weather(temperature,icon,code,description){
    this.meanTemperature = temperature;
    this.icon = icon;
    this.code = code;
    this.description = description;
}
/**
* @description Function to get the Icon url of the weather
*/
Weather.prototype.getIconUrl = function(){
    return `./images/${this.icon}.png`
}

export { Weather }