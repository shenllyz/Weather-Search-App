import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { config } from "../config/config.js";

const uri = `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@websearchstorage.gd79h.mongodb.net/?retryWrites=true&w=majority&appName=WebSearchStorage`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
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
    console.log(`Inserted new value: _id: ${result.insertedId}, city: ${city}, state: ${state}, lat: ${lat}, lng}`);
    return { _id: result.insertedId, city, state, lat, lng };
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