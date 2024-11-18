import express from "express";
import {
  getGoogleMapsApiKey,
  getIPLocation,
  autocomplete,
  getGeocoding,
  getWeather,
  addFavoriteLocation,
  deleteFavoriteLocation,
  getAllFavoritesLocations
} from "../controllers/locationController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send('Hello from App Engine!');
});

router.get("/google-maps-api-key", getGoogleMapsApiKey);
router.get("/get_IPlocation", getIPLocation);
router.get("/autocomplete", autocomplete);
router.get("/get_geocoding", getGeocoding);
router.get("/get_weather", getWeather);
router.post("/add_favorite_location", addFavoriteLocation);
router.delete("/delete_favorite_location/:id", deleteFavoriteLocation);
router.get("/get_all_favorites_locations", getAllFavoritesLocations);

export default router;