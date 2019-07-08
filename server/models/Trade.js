const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TradeSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: String,
    required: false
  },
  stockname: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: false
  },
  stockquantity: {
    type: Number,
    required: false
  },
  startingprice: {
    type: Number,
    required: false
  },
  stoploss: {
    type: Number,
    required: false
  },
  targetprice: {
    type: Number,
    default: false
  },
  reasonfortrade: {
    type: String,
    required: false
  },
  closingprice: {
    type: Number,
    default: false
  },
  reasonforexit: {
    type: String,
    required: false
  },
  emotionalstate: {
    type: String,
    required: false
  },
  outcome: {
    type: String,
    required: false
  },
  gain: {
    type: String,
    required: false
  },
  followedplan: {
    type: String,
    required: false
  },
  owner: [
    {
      id: {
        type: String
      },
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ]
});

module.exports = Trade = mongoose.model("trade", TradeSchema);
