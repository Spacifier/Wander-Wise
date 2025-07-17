import axios from 'axios';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat ,
                bl_longitude: sw.lng ,
                tr_longitude: ne.lng ,
            },
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;
    } catch (error) {
        console.error('Error fetching places data:', error);
        return null;
    }
}

const WEATHER_API_URL = 'https://api.openweathermap.org/data/3.0/onecall';
export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(WEATHER_API_URL, {
      params: {
        lat,
        lon:lng,
        exclude: 'minutely,hourly,daily,alerts', // remove or modify parts as needed
        units: 'metric', //'imperial'- Fahrenheit, 'standard' - Kelvin
        appid: WEATHER_API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};