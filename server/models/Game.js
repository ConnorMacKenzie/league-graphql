const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  team1: String,
  team2: String,
  winner: String,
  loser: String
});

module.exports = mongoose.model('Game', gameSchema);
