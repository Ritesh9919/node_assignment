import "dotenv/config";
import express from "express";
import axios from "axios";
import { connectDB } from "./db.js";
import { Ticker } from "./ticker.model.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const fetchDataAndStoreInDatabase = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data).slice(0, 10);

    await Ticker.deleteMany({});

    await Ticker.insertMany(
      tickers.map((ticker) => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit,
      }))
    );

    console.log("Data fetched and stored");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

app.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find({});
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static("public"));

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port:8000");
      fetchDataAndStoreInDatabase();
    });
  })
  .catch((err) => {
    console.log(err);
  });
