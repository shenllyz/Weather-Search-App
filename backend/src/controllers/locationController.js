import {
    getGoogleMapsApiKeyService,
    getIPLocationService,
    autocompleteService,
    getGeocodingService,
    getWeatherService,
    addFavoriteLocationService,
    deleteFavoriteLocationService,
    getAllFavoritesLocationsService
  } from "../services/locationService.js";
  
  export async function getGoogleMapsApiKey(req, res) {
    try {
      const result = await getGoogleMapsApiKeyService();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve Google Maps API key" });
    }
  }
  
  export async function getIPLocation(req, res) {
    try {
      const result = await getIPLocationService();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve IP token" });
    }
  }
  
  export async function autocomplete(req, res) {
    const userInput = req.query.input;
  
    if (!userInput) {
      return res.status(400).json({ error: "Missing 'input' query parameter" });
    }
  
    try {
      const cityStatePairs = await autocompleteService(userInput);
      res.json(cityStatePairs);
    } catch (error) {
      console.error("Error fetching autocomplete data:", error);
      res.status(500).json({ error: "Failed to retrieve autocomplete data" });
    }
  }
  
  export async function getGeocoding(req, res) {
    const address = req.query.address;
    try {
      const data = await getGeocodingService(address);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve geocoding data" });
    }
  }
  
  export async function getWeather(req, res) {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
  
    try {
      const data = await getWeatherService(latitude, longitude);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve weather data" });
    }
  }
  
  export async function addFavoriteLocation(req, res) {
    const { city, state, lat, lng } = req.body;
    try {
      const newFavorite = await addFavoriteLocationService(city, state, lat, lng);
      res.status(200).json(newFavorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  }
  
  export async function deleteFavoriteLocation(req, res) {
    const { id } = req.params;
  
    try {
      await deleteFavoriteLocationService(id);
      res.status(200).json({ message: "Value deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  }
  
  export async function getAllFavoritesLocations(req, res) {
    try {
      const values = await getAllFavoritesLocationsService();
      res.status(200).json(values);
    } catch (error) {
      console.error("Error retrieving favorites:", error);
      res.status(500).json({ error: "Failed to retrieve favorites" });
    }
  }