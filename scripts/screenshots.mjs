import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";
const outputDir = path.resolve("../images/screenshots");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-first-run", "--disable-extensions"],
});

try {
  for (const [name, route, width, height] of [
    ["home-desktop", "/", 1440, 1000],
    ["book-desktop", "/book/atomic-habits", 1440, 1000],
    ["login-desktop", "/login", 1440, 1000],
    ["home-mobile", "/", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(outputDir, `${name}.png`), fullPage: true });
    console.log(`${name}.png`);
    await page.close();
  }
} finally {
  await browser.close();
}
