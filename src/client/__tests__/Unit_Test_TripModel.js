/*--------------------------------------------------------
Unit Test for the TripModel code for the App. UDACITY Project - Front End Developper Nanodegree
version: 1.0.0
created on: 15/06/20
last modified: 15/06/20
Updates:
15/06/20    File Creation
author: E. RONDON
----------------------------------------------------------*/

import { Trip } from '../js/TripModel.js'



describe("Unit Test for TripModel.js", () => {

    let dateNow;

    beforeAll(() => {
        dateNow = jest.spyOn(Date, 'now').mockImplementation(() => 1592242962416);
    });

    afterAll(() => {
        dateNow.mockRestore();
    });

    test("Test Constructor", () => {
        
        const timestamp = dateNow();
        const trip = new Trip('city','country',timestamp,timestamp,'https://www.imageurl.com/image.png',3.24,-123.5);
        expect(trip.city).toEqual('city');
        expect(trip.country).toEqual('country');
        expect(trip.departure).toEqual(timestamp);
        expect(trip.arrival).toEqual(timestamp);
        expect(trip.imageUrl).toEqual('https://www.imageurl.com/image.png');
        expect(trip.latitude).toEqual(3.24);
        expect(trip.longitude).toEqual(-123.5);
    });

    test("Test hasImageUrl()", () => {
        const trip = new Trip(undefined,undefined,0,0,undefined,0,0);
        expect(trip.hasImageUrl()).toEqual(false);
        trip.imageUrl = null;
        expect(trip.hasImageUrl()).toEqual(false);
        trip.imageUrl = '';
        expect(trip.hasImageUrl()).toEqual(false);
        trip.imageUrl = 'https://www.imageurl.com/image.png';
        expect(trip.hasImageUrl()).toEqual(true);
        
    });

    test("test remainingDaysToTrip()",() => {
        const departure = dateNow() + (3*86400000);
        const trip = new Trip(undefined,undefined,departure,0,undefined,0,0);
        expect(trip.remainingDaysToTrip()).toEqual(3);
    });

    test("test duration()",() => {
        const departure = dateNow() + (3*86400000);
        const arrival= departure + (5*86400000);
        const trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        expect(trip.duration()).toEqual(5);
    });

    test("test weatherPredictionLength()", () =>{
        let departure = dateNow() + (8*86400000);
        let arrival= departure + (5*86400000);
        let trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        expect(trip.weatherPredictionLength()).toEqual(5);

        departure = dateNow() + (8*86400000);
        arrival= departure + (9*86400000);
        trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        expect(trip.weatherPredictionLength()).toEqual(7);

        departure = dateNow() + (4*86400000);
        arrival= departure + (7*86400000);
        trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        expect(trip.weatherPredictionLength()).toEqual(7);

        departure = dateNow() + (1*86400000);
        arrival= departure + (20*86400000);
        trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        expect(trip.weatherPredictionLength()).toEqual(16);
    });

    test("test weatherType()", () =>{
        let departure = dateNow() + (8*86400000);
        let arrival= departure + (5*86400000);
        let trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        let result = 'The weather prediction for the next 5 days are';
        expect(trip.weatherType()).toEqual(result);

        departure = dateNow() + (4*86400000);
        arrival= departure + (5*86400000);
        trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        result = 'The current weather is';
        expect(trip.weatherType()).toEqual(result);

        departure = dateNow() + (0*86400000);
        arrival= departure + (19*86400000);
        console.log(trip.remainingDaysToTrip());
        trip = new Trip(undefined,undefined,departure,arrival,undefined,0,0);
        result = 'The weather prediction for the next 16 days are';
        expect(trip.weatherType()).toEqual(result);
    });

    test("test weatherForecastLatLong()", () => {
       let lat = 3.5;
       let long = 4.6;

       let trip = new Trip(null,null,0,0,null,lat,long);
       let result = `&lat=${lat}&lon=${long}`;

       expect(trip.weatherForecastLatLong()).toEqual(result);
    });

});