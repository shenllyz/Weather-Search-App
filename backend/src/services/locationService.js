import { insertLocationValue, deleteLocationValue, getAllLocationValues } from "../models/locationModel.js";
import { config } from "../config/config.js";
import axios from "axios";

export async function getGoogleMapsApiKeyService() {
  return { apikey: config.GOOGLE_MAPS_API_KEY };
}

export async function getIPLocationService() {
  return { token: config.IPINFO_TOKEN };
}

export async function autocompleteService(userInput) {
  const autocompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  const params = {
    input: userInput,
    key: config.GOOGLE_MAPS_API_KEY,
    types: '(cities)',
    components: 'country:us',
  };

  const response = await axios.get(autocompleteUrl, { params });
  const predictions = response.data.predictions;

  return predictions.map(prediction => {
    const terms = prediction.terms;
    if (terms.length >= 2) {
      const city = terms[0].value;
      const state = terms[1].value;
      return { city, state };
    }
    return null;
  }).filter(pair => pair !== null);
}

export async function getGeocodingService(address) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(geocodingUrl);
  return response.data;
}

export async function getWeatherService(latitude, longitude) {
  const url = 'https://api.tomorrow.io/v4/timelines';
  const params = {
    location: `${latitude},${longitude}`,
    apikey: config.TOMORROW_API_KEY,
    fields: [
      "temperature",
      "temperatureApparent",
      "temperatureMin",
      "temperatureMax",
      "windSpeed",
      "windDirection",
      "humidity",
      "pressureSeaLevel",
      "uvIndex",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "sunriseTime",
      "sunsetTime",
      "visibility",
      "moonPhase",
      "cloudCover"
    ],
    timezone: "America/Los_Angeles",
    timesteps: ["1h", "1d"],
    units: "imperial"
  };

  const response = await axios.get(url, { params });
  return response.data;
}

export async function addFavoriteLocationService(city, state, lat, lng) {
  return await insertLocationValue(city, state, lat, lng);
}

export async function deleteFavoriteLocationService(id) {
  return await deleteLocationValue(id);
}

export async function getAllFavoritesLocationsService() {
  return await getAllLocationValues();
}