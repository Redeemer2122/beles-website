/* global console, document, process */

import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const referencePath = path.resolve("tests/visual/references/national-oem-desktop.png");
const outputDir = path.resolve("tests/visual/output");
const actualPath = path.join(outputDir, "national-oem-desktop.actual.png");
const diffPath = path.join(outputDir, "national-oem-desktop.diff.png");

test("national OEM section matches reference image", async ({ page }) => {
  fs.mkdirSync(outputDir, { recursive: true });
  const reference = PNG.sync.read(fs.readFileSync(referencePath));

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
    `,
  });
  await page.evaluate(() => document.fonts.ready);

  const section = page.locator(".national-oem-section");
  await expect(section).toBeVisible();
  const box = await section.boundingBox();
  expect(box, "national OEM section must have a screenshot box").not.toBeNull();
  console.log(
    `National OEM section box: ${Math.round(box.width)}x${Math.round(
      box.height,
    )}; reference: ${reference.width}x${reference.height}`,
  );
  await section.screenshot({ path: actualPath, animations: "disabled" });

  let actual = PNG.sync.read(fs.readFileSync(actualPath));
  expect(
    actual.width >= reference.width && actual.height >= reference.height,
    `actual screenshot ${actual.width}x${actual.height} must be at least reference size ${reference.width}x${reference.height}`,
  ).toBe(true);

  if (actual.width !== reference.width || actual.height !== reference.height) {
    const cropped = new PNG({
      width: reference.width,
      height: reference.height,
    });
    for (let y = 0; y < reference.height; y += 1) {
      actual.data.copy(
        cropped.data,
        y * reference.width * 4,
        y * actual.width * 4,
        y * actual.width * 4 + reference.width * 4,
      );
    }
    actual = cropped;
    fs.writeFileSync(actualPath, PNG.sync.write(actual));
  }

  const diff = new PNG({ width: reference.width, height: reference.height });
  const diffPixels = pixelmatch(
    reference.data,
    actual.data,
    diff.data,
    reference.width,
    reference.height,
    { threshold: 0.1 },
  );
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = reference.width * reference.height;
  const diffRatio = diffPixels / totalPixels;
  console.log(
    `National OEM visual diff: ${diffPixels}/${totalPixels} pixels (${(diffRatio * 100).toFixed(
      2,
    )}%). Diff saved to ${diffPath}`,
  );

  expect(diffRatio).toBeLessThan(Number.parseFloat(process.env.VISUAL_MAX_DIFF_RATIO ?? "0.02"));
});
