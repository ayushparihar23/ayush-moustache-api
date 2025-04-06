const geolib = require("geolib");

function getDistanceInKm(coord1, coord2) {
  return geolib.getDistance(coord1, coord2) / 1000;
}

module.exports = { getDistanceInKm };
