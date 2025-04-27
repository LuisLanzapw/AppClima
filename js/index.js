const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}

const isDayTime = (icon) => {
    if (icon.includes('d')) 
        { return true }
    else 
        { return false }
}

// add an event listener to the form
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCity(citySearched)
        .then((data) => {
            updateWeatherApp(data)
        })
        .catch((error) => {  console.log(error) });
})

updateWeatherApp = (city) => {
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/w/${imageName}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
      <div class="card-mid row">
        <div class="col-8 text-center temp">
          <span>${spitOutCelcius(city.main.temp)}&deg;C</span>
        </div>
        <div class="col-4 condition-temp">
          <p class="condicion">${city.weather[0].description}</p>
          <p class="maxima">${spitOutCelcius(city.main.temp_max)}&deg;C</p>
          <p class="minima">${spitOutCelcius(city.main.temp_min)}&deg;C</p>
        </div>
      </div>
  
      <div class="icon-container card shadow mx-auto">
        <img src="${iconSrc}" alt="" />
      </div>
  
      <div class="lh-1 px-5 py-4 small">
        <dl class="row">
          <dt class="col-sm-7 text-end">Sensación T.</dt>
          <dd class="col-sm-5">${spitOutCelcius(city.main.feels_like)}&deg;C</dd>
  
          <dt class="col-sm-7 text-end">Velocidad V.</dt>
          <dd class="col-sm-5">${city.wind.speed} m/s</dd>
  
          <dt class="col-sm-7 text-end">Humedad</dt>
          <dd class="col-sm-5">${city.main.humidity}%</dd>
  
          <dt class="col-sm-7 text-end">Presión</dt>
          <dd class="col-sm-5">${city.main.pressure} hPa</dd>
  
          <dt class="col-sm-7 text-end">Nivel del mar</dt>
          <dd class="col-sm-5">${city.main.sea_level ? city.main.sea_level + ' hPa' : 'No disponible'}</dd>
  
          <dt class="col-sm-7 text-end">Visibilidad</dt>
          <dd class="col-sm-5">${(city.visibility / 1000).toFixed(1)} km</dd>
        </dl>
      </div>
    `;
  
    if (isDayTime(imageName)) {
      timeImage.setAttribute('src', 'img/day_image.svg');
    } else {
      timeImage.setAttribute('src', 'img/night_image.svg');
    }
  }
  
  

