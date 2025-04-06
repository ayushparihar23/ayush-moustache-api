const Fuse = require("fuse.js");

const locations = [
  "Udaipur", "Jaipur", "Delhi", "Koksar", "Rishikesh", "Agra", "Jaisalmer", "Manali", "Sissu"
];

const fuse = new Fuse(locations, { threshold: 0.4 });

function correctSpelling(query) {
  const result = fuse.search(query);
  return result.length > 0 ? result[0].item : query;
}

module.exports = { correctSpelling };
