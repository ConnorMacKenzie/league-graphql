const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const championSchema = new Schema({
  name: String,
  role: String
});

module.exports = mongoose.model('Champion', championSchema);
