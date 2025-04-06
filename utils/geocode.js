const axios = require("axios");

async function getCoordinates(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "moustache-api" },
  });
  if (data.length === 0) return null;
  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}

module.exports = { getCoordinates };
