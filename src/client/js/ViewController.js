/*--------------------------------------------------------
View Controller code for the App. UDACITY Project - Front End Developper Nanodegree
version: 0.0.1
created on: 20/06/20
last modified: 20/06/20
Updates:
20/06/20    File Creation
20/06/20    Event callbacks
author: E. RONDON
----------------------------------------------------------*/

let Countries = ["Afghanistan","Albania","Algeria","Samoa","Andorra","Angola","Anguilla","Antarctica","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire","Botswana","Bouvet","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos Islands","Colombia","Comoros","DR Congo","Congo","Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kuwait","Kyrgyzstan","Lao","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena","Ascension Island","Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
let Codes = ['AF','AL','DZ','AS','AD','AO','AI','AQ','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BW','BV','BR','BN','BG','BF','BI','CV','KH','CM','CA','KY','CF','TD','CL','CN','CX','CC','CO','KM','CD','CG','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','SZ','ET','FK','FO','FJ','FI','FR','GF','PF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','BL','SH','','','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM','TC','TV','UG','UA','AE','GB','US','UY','UZ','VU','VE','VN','WF','EH','YE','ZM','ZW'];
let attributeDataKey = 'data-key';
const PLANNED = 0;
const EXPIRED = 2;

/**
* @description Constructor of the view 
*/
function ViewController(viewModel) {

    let self = this;
    this.appViewModel = viewModel;
    this.menuPlannedTrips;
    this.menuExpiredTrips;
    this.containerTrips;
    this.dialogAddTrip;
    this.dialogLoading;
    this.selectCountry;
    this.viewMode = PLANNED;

    /**
    * @description Function called when the viewmodel notify that a item is added to the database
    * @param {String} key- The key of the removed trip
    * @param {Trip} trip - the trip model added to the database
    * @param {boolean} expired - The information about type of database received
    */
    this.itemAdded = function(key,trip,expired){
        if(self.viewMode == PLANNED && expired){
            self.toggleLoadingDialog(false);
            return;
        }else if(self.viewMode == EXPIRED && !expired){
            self.toggleLoadingDialog(false);
            return;
        }

        let card = document.createElement('div');
        card.classList.add('card-container');
        card.setAttribute(attributeDataKey,key);

        let image = document.createElement('img');
        image.classList.add('card-image');
        image.setAttribute('src',trip.imageUrl);
        image.setAttribute('alt','Trip Image');

        let container = document.createElement('div');
        container.classList.add('card-body-container');

        let title = document.createElement('h3');
        title.innerHTML = `${trip.city} - ${trip.country}`;

        let remainingDays = document.createElement('p');
        remainingDays.innerHTML = `The trip is <b>${trip.remainingDaysToTrip()}</b> days away`;

        let button = document.createElement('button');
        button.classList.add('borderless-button');
        button.classList.add('align-end');
        button.innerHTML = 'REMOVE';

        let weatherTitle = document.createElement('p');
        weatherTitle.innerHTML = trip.weatherType();

        let scrollingContainer = document.createElement('div');
        scrollingContainer.classList.add('scrolling-container');

        let loopedDay = new Date(trip.departure);
        for(const day of trip.weatherData){
            let weatherDay = document.createElement('div');
            weatherDay.classList.add('weather-container');

            let isoDay = document.createElement('h4');
            isoDay.innerHTML = loopedDay.toLocaleDateString();
            let icon = document.createElement('img');
            icon.setAttribute('src',day.getIconUrl());

            let temperature = document.createElement('p');
            temperature.innerHTML = `${day.meanTemperature} °C`;

            weatherDay.appendChild(isoDay);
            weatherDay.appendChild(icon);
            weatherDay.appendChild(temperature);

            scrollingContainer.appendChild(weatherDay);
            loopedDay.setMilliseconds(loopedDay.getMilliseconds()+86400000);
        }

        container.appendChild(title);
        container.appendChild(remainingDays);
        container.appendChild(weatherTitle);
        container.appendChild(scrollingContainer);
        container.appendChild(button);

        card.appendChild(image);
        card.appendChild(container);

        self.containerTrips.appendChild(card);
        self.toggleLoadingDialog(false);
    }
    /**
    * @description Function called when the viewmodel notify that a item is removed from database
    * @param {String} key- The key of the removed trip
    * @param {boolean} expired - The information about type of database received
    */
    this.itemRemoved = function(key,expired){
        const elements = self.containerTrips.getElementsByClassName('card-container');
        for(let element of elements){
            if(element.getAttribute(attributeDataKey) == key){
                element.parentElement.removeChild(element);
            }
        }
        self.toggleLoadingDialog(false);
    }
    /**
    * @description Function called when the modelview notify that the database has changed
    * @param {[Trip]} tripList- The full database of trips
    * @param {boolean} expired - The information about type of database received
    */
    this.dataChange = function(tripList,expired){
        Object.keys(tripList).forEach( (key) =>{
            self.itemAdded(key,tripList[key],expired);
        });
        self.toggleLoadingDialog(false);
    }
    /**
    * @description Function called when a Trip Remove button is clicked
    * @param {Event} event - The event associated with the event listener
    */
    this.cardClickListener = function(event){
        const key = event.target.parentElement.parentElement.getAttribute(attributeDataKey);
        self.appViewModel.removeTripFromDatabase(key,self.viewMode==EXPIRED?true:false);
    }
    /**
    * @description Function called when the document is loaded in order to realize initializations of the app
    * @param {Event} event - The event associated with the event listener
    */
    this.documentLoaded = function(event){
        self.menuPlannedTrips = document.getElementById('menu-planned-trips');
        self.menuExpiredTrips = document.getElementById('menu-expired-trips');
        self.containerTrips   = document.getElementById('trip-container');
        self.dialogAddTrip    = document.getElementById('dialog-new-trip');
        self.dialogLoading    = document.getElementById('dialog-loading');
        self.selectCountry    = document.getElementById('trip-country');

        document.getElementById('navigaton-bar').addEventListener('click',self.menuEventClickCallback,true);
        document.getElementById('add-button').addEventListener('click',self.buttonEventClickCallback);
        document.getElementById('dialog-save-button').addEventListener('click',self.buttonEventClickCallback);
        document.getElementById('dialog-cancel-button').addEventListener('click',self.buttonEventClickCallback);
        self.containerTrips.addEventListener('click',self.cardClickListener);

        self.appViewModel.setCallbacks(self.itemAdded,self.itemRemoved,self.dataChange);
        for(var index=0;index<Countries.length;index++){
            let option = document.createElement('option');
            option.text = Countries[index];
            option.value = Codes[index];
            try{
                self.selectCountry.add(option,null);
            }catch{
                self.selectCountry.add(option);
            }
        }
    }    
    /**
    * @description Function called when the menu bar is clicked
    * @param {Event} event - The event associated with the event listener
    */
    this.menuEventClickCallback = function(event){
        event.preventDefault()
        const targetId = event.target.id;
        
        if(targetId == self.menuPlannedTrips.id){
            self.menuPlannedTrips.classList.remove('navbar-item-style');
            self.menuExpiredTrips.classList.remove('navbar-item-style-active');
            self.menuPlannedTrips.classList.add('navbar-item-style-active');
            self.menuExpiredTrips.classList.add('navbar-item-style');
            if(self.viewMode == EXPIRED){
                self.containerTrips.innerHTML = '';
                self.toggleLoadingDialog(true);
                self.viewMode = PLANNED;
                self.appViewModel.getEntireDatabase(false);
            }
        }else if(targetId == self.menuExpiredTrips.id){
           self.menuExpiredTrips.classList.remove('navbar-item-style');
           self.menuPlannedTrips.classList.remove('navbar-item-style-active');
           self.menuPlannedTrips.classList.add('navbar-item-style');
           self.menuExpiredTrips.classList.add('navbar-item-style-active');
           if(self.viewMode == PLANNED){
                self.containerTrips.innerHTML = '';
                self.toggleLoadingDialog(true);
                self.viewMode = EXPIRED;
                self.appViewModel.getEntireDatabase(true);    
            }
        }
        
    }
    /**
    * @description Function called when the one button of the view is clicked
    * @param {Event} event - The event associated with the event listener
    */
    this.buttonEventClickCallback = function(event){
        event.preventDefault()
        const id = event.target.id;

        if(id == 'add-button'){
            self.toggleNewTripDialog(true);
        }else if(id == 'dialog-save-button'){
            self.addNewTrip();
        }else if (id == 'dialog-cancel-button'){
            self.toggleNewTripDialog(false);
        }
    }
    /**
    * @description Function called to toogle the visualization of the new trip dialog
    * @param {Bolean} show - Boolean to know if the dialog shall be hide or shown
    */
    this.toggleNewTripDialog = function(show){
       if(show){
           self.dialogAddTrip.classList.remove('hidden-item');
           self.dialogAddTrip.classList.add('dialog-screen');
       }else{
           self.dialogAddTrip.classList.remove('dialog-screen');  
           self.dialogAddTrip.classList.add('hidden-item');      
       }
    }
    /**
    * @description Function called to toogle the visualization of the loading dialog
    * @param {Bolean} show - Boolean to know if the dialog shall be hide or shown
    */
    this.toggleLoadingDialog = function(show){
    if(show){
        self.dialogLoading.classList.remove('hidden-item');
        self.dialogLoading.classList.add('dialog-screen');
    }else{
        self.dialogLoading.classList.remove('dialog-screen');  
        self.dialogLoading.classList.add('hidden-item');      
    }
    }
    /**
    * @description function called when the user wants to add a new trip
    */
    this.addNewTrip = function(){
        const city = document.getElementById('trip-city').value;
        const departure = document.getElementById('trip-departure').value;
        const arrival = document.getElementById('trip-arrival').value;
        const countryCode = self.selectCountry.value;
        const country =  self.selectCountry.options[self.selectCountry.selectedIndex].text;
        

        if(!!city && !!departure && !!arrival && !!countryCode && !!country){
            const departureDate = new Date(departure);
            const arrivalDate = new Date(arrival);

            const departureTimestamp = departureDate.getTime();
            const arrivalTimestamp = arrivalDate.getTime();
           
            self.appViewModel.getDataForNewTrip(city,country,countryCode,departureTimestamp,arrivalTimestamp);
            self.toggleNewTripDialog(false);
            self.toggleLoadingDialog(true);
        }
    }

}



export { ViewController }

