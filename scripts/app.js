'use strict';

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const cityImg = document.querySelector('img.cityImg');
const icon = document.querySelector('.icon img');
const spinner = document.querySelector('.spinner-border');


const updateUI = function (data) {

    const { cityName, weather } = data;
    // update details template
    details.innerHTML = `
                    <h5 class="my-2 text-uppercase text-center">
                        ${cityName === 'Ayoun El Atrous' ? cityName.slice(0, 5) : cityName}
                    </h5>

                    <div class="my-2 text-center fs-6">${weather.WeatherText}</div>

                    <div class="display-4 my-1 text-center">
                        <span>${weather.Temperature.Metric.Value}&deg;C</span>
                    </div>

                    <div class="my-2 py-0 px-3">

                        <div class="details-flex">
                            <span>Ressentie </span>
                            <span> ${weather?.ApparentTemperature.Metric.Value} &deg;C</span>
                        </div>
                        
                        <div class="details-flex">
                        <span>Point de rosée </span>
                        <span> ${weather?.DewPoint.Metric.Value}&deg;C</span>
                        </div>
                        
                        ${+weather?.PrecipitationSummary.Past24Hours.Metric.Value !== 0 ? `<div class="details-flex"> <span>Précipitations (24h): </span>
                        <span> ${weather.PrecipitationSummary.Past24Hours.Metric.Value} mm</span></div>` : ''}
                        
                        <div class="details-flex">
                        <span>Humidité </span>
                        <span> ${weather?.RelativeHumidity}%</span>
                        </div>
                        
                        <div class="details-flex">
                        <span>Indice UV </span>
                        <span> ${weather?.UVIndex} (${weather.UVIndexText})</span>
                        </div>
                        
                        <div class="details-flex">
                        <span>Visibilité </span>
                        <span> ${weather?.Visibility.Metric.Value} Km</span>
                        </div>
                        
                        <div class="details-flex">
                        <span>Vent </span>
                        <span> ${weather?.Wind.Direction.Degrees}° ${weather?.Wind.Direction.Localized} | ${weather?.Wind.Speed.Metric.Value} Km/h</span>
                        </div>

                        <div class="details-flex">
                        <span>Nuages </span>
                        <span> ${weather?.CloudCover}%</span>
                        </div>

                        <div class="details-flex">
                        <span>Pression </span>
                        <span> ${weather?.Pressure.Metric.Value} mb</span>
                        </div>

                        <div class="details-flex">
                        <span>Plafond </span>
                        <span> ${weather?.Ceiling.Metric.Value} m</span>
                        </div>
                    </div>`;

    // icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    icon.setAttribute('alt', weather.WeatherText);
    icon.setAttribute('title', weather.WeatherText);

    // city img
    const cityImgSrc = `img/cities/${cityName.slice(0, 5)}.jpg`;
    cityImg.setAttribute('src', cityImgSrc);
    cityImg.setAttribute('alt', cityName);


    // remove d-none
    spinner.classList.add('d-none');
    card.classList.remove('d-none');
};

const updateCity = async function (city) {
    if (sessionStorage.getItem('city') && city === JSON.parse(sessionStorage.getItem('city')).cityName) {
        const { cityName, weather } = JSON.parse(sessionStorage.getItem('city'));
        return { cityName, weather };
    } else {
        // const cityDetails = await getCity(city);
        const cityKey = cityData.find(c => c.name === city).key;
        if (!cityKey) return;
        const cityName = city;
        const weather = await getWeather(cityKey);

        sessionStorage.setItem('city', JSON.stringify({ cityName, weather }));

        return { cityName, weather };
    }
};

// Handling form
cityForm.addEventListener('submit', function (e) {
    e.preventDefault();
    spinner.classList.remove('d-none');
    card.classList.add('d-none');
    // get city
    const city = cityForm.city.value.trim();
    if (!city) return;

    cityForm.reset();
    // update UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

if (sessionStorage.getItem('city')) {
    spinner.classList.remove('d-none');
    card.classList.add('d-none');
    updateCity(JSON.parse(sessionStorage.getItem('city')).cityName)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}