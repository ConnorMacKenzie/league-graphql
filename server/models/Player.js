const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  ign: String,
  position: String,
  team: String
});

module.exports = mongoose.model('Player', playerSchema);
