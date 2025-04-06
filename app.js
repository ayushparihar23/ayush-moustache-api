const express = require("express");
const { correctSpelling } = require("./utils/spellcheck");
const { getCoordinates } = require("./utils/geocode");
const { getDistanceInKm } = require("./utils/distance");
const properties = require("./data/properties.json");

const app = express();
const PORT = 3000;

app.get("/nearest-properties", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  const corrected = correctSpelling(query);
  const location = await getCoordinates(corrected);
  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }

  const nearby = properties
    .map((p) => ({
      property: p.property,
      distance: getDistanceInKm(location, { latitude: p.latitude, longitude: p.longitude }),
    }))
    .filter((p) => p.distance <= 50)
    .sort((a, b) => a.distance - b.distance);

  if (nearby.length === 0) {
    return res.json({
      query,
      corrected,
      message: "No properties found within 50km",
    });
  }

  return res.json({
    query,
    corrected,
    results: nearby,
  });
});

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
