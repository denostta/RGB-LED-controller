import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/send-color", cors());

//Server test
app.get("/", (req, res) => {
  res.send("Server is active");
});

// Initialize RGB values
let rgbValues = { r: 0, g: 0, b: 0 };

// Endpoint to receive RGB values from frontend
app.post("/send-color", (req, res) => {
  const { r, g, b } = req.body;
  console.log("Received RGB values from frontend:", { r, g, b });

  // Update RGB values
  rgbValues = { r, g, b };

  res.status(200).send("RGB values received successfully!");
});

// Endpoint to provide RGB values to ESP32
app.get("/get-color", (req, res) => {
  res.json(rgbValues);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
