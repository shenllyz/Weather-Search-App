import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  TOMORROW_API_KEY: process.env.TOMORROW_API_KEY,
  IPINFO_TOKEN: process.env.IPINFO_TOKEN,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  PORT: process.env.PORT || 8001
};