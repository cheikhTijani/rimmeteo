'use strict';

const key = process.env.API_KEY;

// get city
async function getCity(city) {

    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);

    if (response.ok !== true) {
        throw new Error('Could not fetch data');
    }

    const data = await response.json();

    return data[0];
};

// get weather
async function getWeather(cityKey) {

    const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}&language=fr-Fr&details=true`;

    const response = await fetch(baseUrl + query);

    if (response.ok !== true) {
        throw new Error('Could not fetch data');
    }

    const data = await response.json();

    return data[0];
};