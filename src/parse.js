import { load } from "cheerio";

export function parseEconomicCalendar(html) {
  const $ = load(html);
  const results = [];

  $("#economicCalendarData tbody tr").each((_, row) => {
    const cols = $(row).find("td");
    if (cols.length < 7) return;

    results.push({
      time: $(cols[0]).text().trim(),
      country: $(cols[1]).find("img").attr("title") || "",
      importance: $(cols[2]).find("span").length,
      event: $(cols[3]).text().trim(),
      actual: $(cols[4]).text().trim(),
      forecast: $(cols[5]).text().trim(),
      previous: $(cols[6]).text().trim(),
    });
  });

  return results;
}
