let term = 'Toronto';
const API_KEY: string = '1510d90cffc44782a1b04935231712';
//basic function to hit api
async function getWeather(location: string) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`,
      { mode: 'cors' },
    );

    if (response.status == 200) {
      return response.json();
    }

    throw new Error(`${response.status}`);
  }
  catch (error) {
    alert(error);
  }
}

// function getCurrent(weatherData: ) {
//     return weatherData.current;
// }

// function getLocation(weatherData) {
//     return weatherData.Location;
// }
const weather = getWeather(term);

console.log(weather);
