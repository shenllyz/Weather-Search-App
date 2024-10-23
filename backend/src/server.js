import express from "express";
import cors from "cors";
import { run } from './mongodb.js';
const app = express();

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

run().catch(console.dir);

// write a sample test api
app.get('/api', (req, res) => {
  res.send('Hello from App Engine!');
});

// write an api to return a HTML page
app.get('/api/html', (req, res) => {
  res.send('<h1>Hello from App Engine!</h1>');
});



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});