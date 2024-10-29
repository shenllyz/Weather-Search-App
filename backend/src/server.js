import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { run } from "./mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
console.log("Loading environment variables...");
dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log("Environment variables loaded.");

const app = express();
const tomorrowAPIkey = process.env.TOMORROW_API_KEY;
const ipToken = process.env.IPINFO_TOKEN;
const geocoding_key = process.env.GOOGLE_GEOCODING_API_KEY;
 
app.use(cors());
run().catch(console.dir);

app.get(['/', '/index'], (req, res) => {
  res.send('Hello from App Engine!');
});


app.get('/get_IPlocation', async (req, res) => {
  const ipInfoUrl = `https://ipinfo.io/?token=${ipToken}`;
  try {
    const response = await axios.get(ipInfoUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve IP location data" });
  }
});

app.get('/get_geocoding', async (req, res) => {
 const address = req.query.address;
 const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocoding_key}`;
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

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {  
  console.log(`Server listening on port ${PORT}...`);
});