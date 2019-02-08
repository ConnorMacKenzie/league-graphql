const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerStatsSchema = new Schema({
  game: String,
  player: String,
  kills: Number,
  deaths: Number,
  assists: Number,
  gold: String,
  champions: String
});

module.exports = mongoose.model('PlayerStats', playerStatsSchema);
