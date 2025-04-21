
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  batsman: String,
  nonStriker: String,
  bowler: String,
  runs: Number,
  extras: {
    wide: Number,
    noBall: Number,
    bye: Number,
    legBye: Number,
    overthrow: Number
  },
  wicket: Boolean,
  description: String
}, { timestamps: true });

const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  currentInning: Number,
  deliveries: [deliverySchema],
  totalScore: Number,
  wickets: Number,
  overs: Number
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
