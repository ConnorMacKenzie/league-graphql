const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const championSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Champion', championSchema);
