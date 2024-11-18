import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import locationRoutes from "./routes/locationRoutes.js";
import { run } from "./models/locationModel.js";

const app = express();
app.use(cors());
app.use(express.json());

run().catch(console.dir);

app.use("/", locationRoutes);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});