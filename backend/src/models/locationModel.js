import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db.js";

export async function insertLocationValue(city, state, lat, lng) {
  const db = await connectToDatabase();
  const collection = db.collection("locations");
  const newValue = { city, state, lat, lng };
  const result = await collection.insertOne(newValue);
  console.log(`Inserted new value: _id: ${result.insertedId}, city: ${city}, state: ${state}, lat: ${lat}, lng}`);
  return { _id: result.insertedId, city, state, lat, lng };
}

export async function deleteLocationValue(id) {
  const db = await connectToDatabase();
  const collection = db.collection("locations");
  const query = { _id: new ObjectId(id) };
  const doc = await collection.findOne(query);

  if (doc) {
    await collection.deleteOne(query);
    console.log(`Deleted value: _id: ${doc._id}, city: ${doc.city}, state: ${doc.state}`);
  } else {
    console.log(`No document found with _id: ${id}`);
  }
}

export async function getAllLocationValues() {
  const db = await connectToDatabase();
  const collection = db.collection("locations");
  const values = await collection.find({}).toArray();
  console.log("Retrieved all values:", values);
  return values;
}