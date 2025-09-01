const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  brideNames: String,
  eventDate: String,
  eventTime: String,
  eventLocation: String,
  eventAddress: String,
  pixKey: String,
  pixName: String,
  aboutText: String,
  heroImage: String,
});

module.exports = mongoose.model('Settings', SettingsSchema);