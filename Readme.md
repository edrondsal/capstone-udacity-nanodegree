# CAPSTONE TRAVEL APP PROJECT

## Table of Contents
* [Server](#Server)
* [Client](#Client)
* [Additional Functionalites](#Additional)


## Server
Server is created with express and listenning to port 8000.
Three routes are created as follows:
1. GET Route
2. POST Route
3. DELETE Route

## Client
The client is composed of:
* NetworkManager
* TripModel
* WeatherModel
* ViewModel
* ViewController

### NetworkManager
The functions that handles the Fetch requests. This module is 100% Unit Tested with Jest

### TripModel
This module define the prototype for the Trip used in the app. This is module is 90% Unit Tested with Jest

### WeatherModel
This module define the prototype for the Weather data that are added to the trips.

### ViewModel
This module is the bridge between the view controller and the data and core functionalities

### ViewController
This module handles the user experience

## Additional Functionalities
The list below shows the implemented additional functionalites:
* Allow the user to remove the trip.
* Instead of just pulling a single day forecast, pull the forecast for multiple days.
* Incorporate icons into forecast.
* Allow the user to add additional trips
* Move expired trips to bottom/have their style change so it’s clear it’s expired. (A special TAB is added to have expired trips)