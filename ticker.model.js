import mongoose from "mongoose";

const tickerSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

export const Ticker = mongoose.model("Ticker", tickerSchema);
