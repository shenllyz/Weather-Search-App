import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "../config/config.js";

const uri = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@websearchstorage.gd79h.mongodb.net/?retryWrites=true&w=majority&appName=WebSearchStorage`;

let client;
let db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    db = client.db("Favorites");
    console.log("Connected to MongoDB");
  }
  return db;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("Closed MongoDB connection");
  }
}