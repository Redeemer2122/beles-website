/* global console, document */

import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const outputDir = path.resolve("tests/visual/output/responsive");

const cases = [
  { name: "desktop-1920x1080", width: 1920, height: 1080 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "mobile-390x844", width: 390, height: 844 },
];

test.describe("national OEM responsive sanity", () => {
  for (const viewportCase of cases) {
    test(`${viewportCase.name} has no layout overflow`, async ({ page }) => {
      fs.mkdirSync(outputDir, { recursive: true });

      await page.setViewportSize({
        width: viewportCase.width,
        height: viewportCase.height,
      });
      await page.goto("/");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            scroll-behavior: auto !important;
          }

          .skip-link {
            display: none !important;
          }
        `,
      });
      await page.evaluate(() => document.fonts.ready);

      const section = page.locator(".national-oem-section");
      await expect(section).toBeVisible();

      const box = await section.boundingBox();
      expect(box, "national OEM section must have a screenshot box").not.toBeNull();

      const metrics = await page.evaluate(() => {
        const sectionElement = document.querySelector(".national-oem-section");
        const rect = sectionElement.getBoundingClientRect();

        return {
          bodyScrollWidth: document.body.scrollWidth,
          documentScrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          sectionWidth: Math.round(rect.width),
          sectionHeight: Math.round(rect.height),
        };
      });

      console.log(
        `${viewportCase.name}: section ${metrics.sectionWidth}x${metrics.sectionHeight}; ` +
          `scroll ${metrics.documentScrollWidth}/${metrics.clientWidth}`,
      );

      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(viewportCase.width + 1);
      expect(metrics.documentScrollWidth).toBeLessThanOrEqual(viewportCase.width + 1);

      await section.screenshot({
        path: path.join(outputDir, `${viewportCase.name}.png`),
        animations: "disabled",
      });
    });
  }
});
