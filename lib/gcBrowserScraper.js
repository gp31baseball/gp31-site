// lib/gcBrowserScraper.js

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// enable stealth mode
puppeteer.use(StealthPlugin());

// simple sleep
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function scrapeTeamSchedule(teamKey, teamName, url) {
  console.log("SCRAPER STARTED:", teamKey, teamName, url);

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1400,900",
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();

  // Pretend to be real Chrome
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    console.log("Navigating to:", url);
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Let GC load + hydrate React
    await sleep(3000);

    // 🔥 Remove popup repeatedly (5 seconds)
    console.log("Removing popup…");
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        const popup = document.querySelector(
          '[role="dialog"], [data-testid="modal-root"], .ReactModalPortal'
        );
        if (popup) popup.remove();
      });
      await sleep(500);
    }

    // 🔥 Scroll to force schedule rows to render
    await page.evaluate(() => window.scrollBy(0, 2000));
    await sleep(1500);

    // 🔥 Extract individual game rows
const games = await page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll("a.ScheduleListByMonth__event")
);

  return rows.map((row, idx) => {
    // Date
    const dateRaw =
      row.querySelector("div.ScheduleListByMonth__dateText")
        ?.textContent?.trim() || null;

    // Score
    const scoreRaw =
      row.querySelector("span.ScheduleListByMonth__scoreOrTimeText")
        ?.textContent?.trim() || null;

    // Opponent + Location (both semibold)
    const semiboldEls = Array.from(
      row.querySelectorAll("div.Text__semibold, span.Text__semibold")
    );

    let opponentRaw = null;
    let locationRaw = null;

    for (let el of semiboldEls) {
      const text = el.textContent.trim();
      const cls = el.className;

      // First semibold containing "vs" or "@" = opponent
      if (!opponentRaw && (text.startsWith("vs.") || text.startsWith("@"))) {
        opponentRaw = text;
        continue;
      }

      // Ignore elements that ARE the score
      if (cls.includes("scoreOrTimeText")) {
        continue;
      }

      // Whatever semibold remains = location
      if (!locationRaw && text.startsWith("@")) {
        locationRaw = text;
      }
    }

    return {
      idx,
      dateRaw,
      opponentRaw,
      scoreRaw,
      locationRaw,
    };
  });
});


    console.log("Extracted games:", games);

    return games;

  } catch (err) {
    console.error("Scraper error:", err);
    return [];
  }
}
