//Nombre del archivo: request.js
//Pegue la clave que le dieron de la pagina openweather
const key = 'ec6b0e028e1076aac44f4a2b1a2781b8';

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}&lang=es`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    console.log(data);
    return data;  
}
