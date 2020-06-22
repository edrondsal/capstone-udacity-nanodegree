/*--------------------------------------------------------
View Model code for the App. UDACITY Project - Front End Developper Nanodegree
version: 0.0.1
created on: 20/06/20
last modified: 20/06/20
Updates:
20/06/20    File Creation
21/06/20    Geonames, Pixabay, Weatherbit API Helper function
author: E. RONDON
----------------------------------------------------------*/
import { getData,postData } from './NetworkManager.js';
import { Trip } from './TripModel.js';
import { Weather } from './WeatherModel';

const pixabayApiKey = '17137934-c2ccf6bdc060ec1feecab7c77';
const geonamesApiKey = 'eduardoRondon';
const weatherbitApiKey = '3a9793e7186e45599c1188636ff9adb8';
const serverPath = '/trips';
const validAspectRatio = 0.5625;
const downloadThreshold = 20000;
const likesThreshold = 400;

/**
* @description Constructor of the view model
*/
function ViewModel() {

    let self = this;
    this.plannedTrips = {};
    this.expiredTrips = {};
    this.notifyItemAdded;
    this.notifyItemRemoved;
    this.notifyDataChange;

    /**
    * @description Main Function to register callbacks
    * @param {Function} itemAddedCallback - The callback when item added in database
    * @param {Function} itemRemovedCallback - the callback when item removed from database
    * @param {Function} dataChangeCallback - The callback when data change
    */
    this.setCallbacks = function(itemAddedCallback,itemRemovedCallback,dataChangeCallback){
        self.notifyItemAdded = itemAddedCallback;
        self.notifyItemRemoved = itemRemovedCallback;
        self.notifyDataChange = dataChangeCallback;
    }
    /**
    * @description Helper Function to construct url for Geoname API
    * @param {String} city - The placename to search for their latitude and longitude
    * @param {String} countryCode - The country, coded in ISO-3166, where to search for the placename
    * @param {String} apikey - The registered user name to realize get request the API
    */
    this.geonameGetUrl = function(city,countryCode,apikey){
        return encodeURI(`http://api.geonames.org/postalCodeSearchJSON?placename=${city}&country=${countryCode}&username=${apikey}`);
    }
    /**
    * @description Helper Function parse the response from the Geoname API
    * @param {Object} response - The object containing the response from the server 
    * @param {String} city - The searched placename
    * @param {String} countryCode - the searched countryCode
    */
    this.parseGeonameResponse = function(response,city,countryCode){
       const results = response.postalCodes;

       let parsedResponse = {
            latitude: 0.0,
            longitude: 0.0
       };

       for(const element of results){
            if(element.adminName2 === city && element.countryCode === countryCode){
                parsedResponse.latitude = element.lat;
                parsedResponse.longitude = element.lng;
                return parsedResponse;
            }
       }

       return parsedResponse;
    }
    /**
    * @description Helper Function to construct url for Pixabay API
    * @param {String} city - The city to search an image
    * @param {String} country - The country of the city to search an image
    * @param {String} apikey - The registered key to realize get request the API
    */
    this.pixabayGetUrl = function(city,country,apikey){
        return encodeURI(`https://pixabay.com/api/?key=${apikey}&q=${city}&image_type=photo&category=travel&orientation=horizontal&per_page=200`);
    }
    /**
    * @description Helper Function parse the response from the Pixabay API
    * @param {Object} response - The object containing the response from the server 
    * @param {double} aspectRatioThreshold - the required aspect ratio of the image
    * @param {long} downloadThreshold - the minimum number of downloads to consider popular image
    * @param {long} likesThreshold - the minimum number of likes to consider popular image
    */
    this.parsePixabayResponse = function(response,aspectRatioThreshold,downloadThreshold,likesThreshold){
        const results = response.hits;
        let imageGoodAspectRatio='';
        let index = 0;

        //find popular image with good aspect ratio
        for(const element of results){
            const aspectRatio = element.imageHeight/element.imageWidth;
            if( Math.abs(aspectRatio - aspectRatioThreshold)<=0.01){
                //save first image with good aspect ratio
                if(index==0){
                    imageGoodAspectRatio = element.webformatURL;
                    index++;
                }
                //test if popular image
                if(element.downloads >= downloadThreshold && element.likes >= likesThreshold){
                    return element.webformatURL;
                }               
            }
        }

        if(!!imageGoodAspectRatio){
            return imageGoodAspectRatio;
        }

        //if not image found search with more large threshold
        for(const element of results){
            const aspectRatio = element.imageHeight/element.imageWidth;
            if( Math.abs(aspectRatio - aspectRatioThreshold)<=0.04){
                //save first image with good aspect ratio
                if(index==0){
                    imageGoodAspectRatio = element.webformatURL;
                    index++;
                }
                //test if popular image
                if(element.downloads >= downloadThreshold && element.likes >= likesThreshold){
                    return element.webformatURL;
                }               
            }
        }
        return imageGoodAspectRatio;
    }
    /**
    * @description Helper Function to construct url for Weatherbit API
    * @param {double} latitude - The latitude of the trip to search for weather information
    * @param {double} longitude - The longitude  of the trip to search for weather information
    * @param {int} forecastDays - The forecast days to search for weather infor, if 0 search for current weather
    * @param {String} apikey - The registered key to realize get request the API
    */
    this.weatherbitGetUrl = function(latitude,longitude,forecastDays,apiKey){
        if(forecastDays==0){
            return `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
        }else{
            return `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=${forecastDays}&key=${apiKey}`
        }
    }
    /**
    * @description Helper Function parse the response from the Weatherbit API
    * @param {Object} response - The object containing the response from the server 
    */
    this.parseWeatherbitResponse = function(response){
        const results = response.data;
        let weatherData = [];

        for(const element of results){
            const weatherElement = new Weather(element.temp,element.weather.icon,element.weather.code,element.weather.description);
            weatherData.push(weatherElement);
        }

        return weatherData;
    }
    /**
    * @description Helper Function to compute new key on the database
    */
    this.createRandomKey = function(){
        const ALPHANUM = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','-','0','1','2','3','4','5','6','7','8','9','_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let result = '';
        for (let index = 0; index < 20; index++) {
            const offset = Math.floor(Math.random() * ALPHANUM.length);
            result = result + ALPHANUM[offset];
        }
        return result;
    }
    /**
    * @description Main Function to add Trip to the database
    * @param {Trip} tripModel - The new trip to add to the database
    */
    this.addTripToDatabase = function(tripModel){
        const expired = tripModel.departure - Date.now() < 0 ? true:false;
        let key = self.createRandomKey();
        if(expired){
            while(self.expiredTrips.hasOwnProperty(key)){
                key = self.createRandomKey();
            }
            self.expiredTrips[key] = tripModel;
        }else{
           while(self.plannedTrips.hasOwnProperty(key)){
                key = self.createRandomKey();
            }
            self.plannedTrips[key] = tripModel; 
            postData(serverPath,tripModel).then(result=>{
                console.log(result);
            });
        }
        if(self.notifyItemAdded!=undefined && self.notifyItemAdded!=null){
            self.notifyItemAdded(key,tripModel,expired);
        }
    }
    /**
    * @description Main Function to remove Trip to the database
    * @param {String} key - The key to remove from the database
    * @param {boolean} expired - Boolean to know if the trip to remove belongs to expired list
    */
    this.removeTripFromDatabase = function(key,expired){
        if(expired){
            if(self.expiredTrips.hasOwnProperty(key)){
                delete self.expiredTrips[key];
            }
        }else{
            if(self.plannedTrips.hasOwnProperty(key)){
                delete self.plannedTrips[key];
            }
        }
        self.notifyItemRemoved(key,expired);
    }
    /**
    * @description Main Function to get entire database
    * @param {boolean} expired - Boolean to know if get expired list
    */    
    this.getEntireDatabase = function(expired){
        if(expired){
            self.notifyDataChange(self.expiredTrips,expired);
            return;
        }
        self.notifyDataChange(self.plannedTrips,expired);
    }
    /**
    * @description Main Function to get all data from API to create the Trip before adding to the database and showing in UI
    * @param {String} city - The city of the trip
    * @param {String} country - The country of the trip
    * @param {String} countryCode - The countryCode, ISO-3166, of the trip
    * @param {long} departure- the departure date in elapsed milliseconds from 1970
    * @param {long} arrival - the return date in elapsed milliseconds from 1970
    */
    this.getDataForNewTrip = function(city,country,countryCode,departure,arrival){
        let promises = [];
        //get data from both APIS: GEONAME and PIXABAY
        promises.push( getData(self.geonameGetUrl(city,countryCode,geonamesApiKey)) );
        promises.push( getData(self.pixabayGetUrl(city,country,pixabayApiKey)) );
        //Wait for both promises to resolver
        Promise.all(promises).then( (results) => {
            const coordinates = self.parseGeonameResponse(results[0],city,countryCode);
            const imageUrl = self.parsePixabayResponse(results[1],validAspectRatio,downloadThreshold,likesThreshold);
            //create the trip from the data collected
            let newTrip = new Trip(city,country,departure,arrival, imageUrl,coordinates.latitude,coordinates.longitude);           
            //get the data from API: WEATHERBIT
            getData(self.weatherbitGetUrl(newTrip.latitude,newTrip.longitude,newTrip.weatherPredictionLength(),weatherbitApiKey)).then( response => {
                const wheatherData = self.parseWeatherbitResponse(response);
                //update trip with weather data
                newTrip.setWeatherData(wheatherData);
                //add trip to database
                self.addTripToDatabase(newTrip);
            }).catch( function(e) {
                console.error(e);
            });
        }).catch( function(error) {
            console.error(error);
        });
    }


}

export { ViewModel}