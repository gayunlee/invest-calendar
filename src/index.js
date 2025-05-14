// src/index.js
import express from "express";
import "dotenv/config";
import { scrapeEconomicCalendarHTML } from "./scrape.js";
import { parseEconomicCalendar } from "./parse.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const html = await scrapeEconomicCalendarHTML();
    const data = parseEconomicCalendar(html);
    console.log("🔍 크롤링 완료: ", data.slice(0, 2) + "...");
    res.json(data);
  } catch (err) {
    console.error("크롤링 실패:", err);
    res.status(500).json({ error: "크롤링 실패" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 서버 실행 중: http://localhost:${PORT}`);
});
