 
import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import locationRoutes from "./routes/locationRoutes.js";
import { connectToDatabase, closeDatabaseConnection } from "./models/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", locationRoutes);

const PORT = config.PORT;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server listening on port ${PORT}...`);
});

 
process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});