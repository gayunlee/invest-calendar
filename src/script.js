import "dotenv/config";
import { scrapeEconomicCalendarHTML } from "./scrape.js";
import { parseEconomicCalendar } from "./parse.js";
import fetch from "node-fetch";

const html = await scrapeEconomicCalendarHTML();
const data = parseEconomicCalendar(html);

console.log("✅ 이벤트 수:", data.length, data);

// Make로 보내기 (선택)
if (process.env.MAKE_WEBHOOK_URL) {
  const res = await fetch(process.env.MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log("📡 Make 전송 결과:", res.status);
}
