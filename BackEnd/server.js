const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function readData() {
  try {
    return JSON.parse(fs.readFileSync("donations.json", "utf8"));
  } catch (err) {
    return [];
  }
}

// Save JSON file
function saveData(data) {
  fs.writeFileSync("donations.json", JSON.stringify(data, null, 2));
}

// Get all donations
app.get("/donations", (req, res) => {
  res.json(readData());
});

// Add donation
app.post("/donate", (req, res) => {
  const donations = readData();

  const donation = {
    id: Date.now(),
    hotel: req.body.hotel,
    food: req.body.food,
    quantity: req.body.quantity,
    location: req.body.location,
    status: "Available"
  };

  donations.push(donation);
  saveData(donations);

  res.json({ message: "Food uploaded successfully" });
});

// Accept donation
app.put("/accept/:id", (req, res) => {
  let donations = readData();

  donations = donations.map((item) => {
    if (item.id == req.params.id) {
      item.status = "Accepted";
    }
    return item;
  });

  saveData(donations);
  res.json({ message: "Accepted" });
});

// Pickup
app.put("/pickup/:id", (req, res) => {
  let donations = readData();

  donations = donations.map((item) => {
    if (item.id == req.params.id) {
      item.status = "Picked Up";
    }
    return item;
  });

  saveData(donations);
  res.json({ message: "Picked Up" });
});

// History
app.get("/history", (req, res) => {
  res.json(readData());
});

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});