import { chromium } from "playwright";
import dayjs from "dayjs";

export async function scrapeEconomicCalendarHTML() {
  const today = dayjs();
  const startDate = today.startOf("month").format("YYYY/MM/DD");
  const endDate = today.endOf("month").format("YYYY/MM/DD");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://kr.investing.com/economic-calendar/", {
    waitUntil: "domcontentloaded",
  });

  await page.click("#onetrust-accept-btn-handler").catch(() => {});
  await page.click("#datePickerToggleBtn");

  await page.fill("#startDate", startDate);
  await page.fill("#endDate", endDate);
  await page.click("#applyBtn");

  await page.waitForSelector("#economicCalendarData tbody tr");
  const html = await page.content();

  await browser.close();
  return html;
}
