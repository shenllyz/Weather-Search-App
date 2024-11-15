import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { run, insertLocationValue, deleteLocationValue, getAllLocationValues } from "./mongodb.js";
 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_URL = process.env.FRONTEND_URL;

console.log("Loading environment variables...");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log("Environment variables loaded.");

const app = express();
app.use(cors());
app.use(express.json());
const tomorrowAPIkey = process.env.TOMORROW_API_KEY;
const ipToken = process.env.IPINFO_TOKEN;
const googleMapsAPIkey = process.env.GOOGLE_MAPS_API_KEY;
 
 
run().catch(console.dir);

app.get(['/', '/index'], (req, res) => {
  res.send('Hello from App Engine!');
});

app.get("/google-maps-api-key", (req, res) => {
  // if (req.headers.origin === FRONTEND_URL) {
    try {
      res.json({ apikey: googleMapsAPIkey });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve Google Maps API key" });      
  } 
// }else {
//     res.status(403).json({ error: "Forbidden", message: "Invalid origin" });
//   }
});

app.get('/get_IPlocation', (req, res) => {
    try {
      res.json({ token: ipToken });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve IP token" });
    }
});

app.get('/autocomplete', async (req, res) => {
  const userInput = req.query.input;
  
  if (!userInput) {
    return res.status(400).json({ error: "Missing 'input' query parameter" });
  }

  const autocompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  const params = {
    input: userInput,
    key: googleMapsAPIkey,
    types: '(cities)',
    components: 'country:us',
  };

  try {
    const response = await axios.get(autocompleteUrl, { params });
    const predictions = response.data.predictions;
    
    const cityStatePairs = predictions.map(prediction => {
      const terms = prediction.terms;
      if (terms.length >= 2) {
        const city = terms[0].value;
        const state = terms[1].value;
        return { city, state };
      }
      return null;
    }).filter(pair => pair !== null);

    res.json(cityStatePairs);
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    res.status(500).json({ error: "Failed to retrieve autocomplete data" });
  }
});



app.get('/get_geocoding', async (req, res) => {
 const address = req.query.address;
 const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsAPIkey}`;
  try {
    const response = await axios.get(geocodingUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve geocoding data" });
  }
})

app.get('/get_weather', async (req, res) => {
  const address = req.query.address || 'University of Southern California, CA';
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  const url = 'https://api.tomorrow.io/v4/timelines';
  const params = {
    location: `${latitude},${longitude}`,
    apikey: tomorrowAPIkey,
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

  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

app.post('/add_favorite_location', async (req, res) => {
  const { city, state, lat, lng } = req.body;
  try {
    const newFavorite = await insertLocationValue(city, state, lat, lng);
    res.status(200).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

app.delete('/delete_favorite_location/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await deleteLocationValue(id);
    res.status(200).json({ message: "Value deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

app.get('/get_all_favorites_locations', async (req, res) => {
  try {
    const values = await getAllLocationValues();
    res.status(200).json(values);
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).json({ error: "Failed to retrieve favorites" });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {  
  console.log(`Server listening on port ${PORT}...`);
});