
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
 
const uri = `mongodb+srv://${username}:${password}@websearchstorage.gd79h.mongodb.net/?retryWrites=true&w=majority&appName=WebSearchStorage`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("admin");

    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(`Databases: ${username}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
export async function insertLocationValue(city, state, lat, lng) {
  try {
    await client.connect();
    const db = client.db("Favorites");
    const collection = db.collection("locations");
    const newValue = { city, state, lat, lng };
    const result = await collection.insertOne(newValue);
    console.log(`Inserted new value: _id: ${result.insertedId}, city: ${city}, state: ${state}, lat: ${lat}, lng: ${lng}`);
  } finally {
    await client.close();
  }
}

 
export async function deleteLocationValue(id) {
  try {
    await client.connect();
    const db = client.db("Favorites");
    const collection = db.collection("locations");
    const query = { _id: new ObjectId(id) };
    const doc = await collection.findOne(query);

    if (doc) {
      await collection.deleteOne(query);
      console.log(`Deleted value: _id: ${doc._id}, city: ${doc.city}, state: ${doc.state}`);
    } else {
      console.log(`No document found with _id: ${id}`);
    }

  } finally {
    await client.close();
  }
}

export async function getAllLocationValues() {
  try {
    await client.connect();
    const db = client.db("Favorites");
    const collection = db.collection("locations");
    const values = await collection.find({}).toArray();
    console.log("Retrieved all values:", values);
    return values;
  } catch (error) {
    console.error("Error retrieving favorites:", error); 
  } finally {
    await client.close();
  }
}

 