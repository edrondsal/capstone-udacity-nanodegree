/*--------------------------------------------------------
Network Management code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 15/06/20
last modified: 15/06/20
Updates:
15/06/20    File Creation
15/06/20    Major Version Unit Test validated
author: E. RONDON
----------------------------------------------------------*/

/**
* @description helper function to use fetch to realize a GET request
* @param {String} url - The url to realiaze the GET request.
*/
async function getData(url = '') {
    const response = await fetch(url);
    try{
        return response.json();
    }catch(error){
        console.log("error",error);
        return {};
    }

}

/**
* @description helper function to use fetch to realize a POST request
* @param {String} url - The url to realiaze the POST request.
* @param {Object} data - The data to send ans body of the POST request
*/
async function postData(url = '',data= {}) {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
  
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

export {getData,
postData}