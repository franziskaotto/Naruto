const mongoose = require("mongoose");

const { Schema } = mongoose;

const CharacterSchema = new Schema({
  id: Number,
  name: { type: String, unique: true, required: true },
  images: [],
  debut: {},
  jutsu: [],
  personal: {},
  family: {},
  natureType: [],
  uniqueTraits: [],
  voiceActors: {},
  tools: [],
  rank: {},
});

module.exports = mongoose.model("Character", CharacterSchema);