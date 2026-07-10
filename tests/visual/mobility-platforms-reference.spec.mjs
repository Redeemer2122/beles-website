/* global console, document, process */

import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const preferredReferencePath = path.resolve(
  "tests/visual/references/mobility-platforms-desktop.png",
);
const fallbackReferencePath = path.resolve(
  "tests/visual/references/mobility-platforms-desktop.png.png",
);
const referencePath = fs.existsSync(preferredReferencePath)
  ? preferredReferencePath
  : fallbackReferencePath;
const outputDir = path.resolve("tests/visual/output/mobility");
const actualPath = path.join(outputDir, "mobility-platforms.actual.png");
const overlayPath = path.join(outputDir, "mobility-platforms.overlay.png");
const diffPath = path.join(outputDir, "mobility-platforms.diff.png");

const copyIntoReferenceCanvas = (actual, reference) => {
  const canvas = new PNG({ width: reference.width, height: reference.height });
  canvas.data.fill(255);

  const width = Math.min(actual.width, reference.width);
  const height = Math.min(actual.height, reference.height);

  for (let y = 0; y < height; y += 1) {
    actual.data.copy(
      canvas.data,
      y * reference.width * 4,
      y * actual.width * 4,
      y * actual.width * 4 + width * 4,
    );
  }

  return canvas;
};

const writeOverlay = (reference, actual) => {
  const overlay = new PNG({ width: reference.width, height: reference.height });

  for (let index = 0; index < reference.data.length; index += 4) {
    overlay.data[index] = Math.round(reference.data[index] * 0.52 + actual.data[index] * 0.48);
    overlay.data[index + 1] = Math.round(
      reference.data[index + 1] * 0.52 + actual.data[index + 1] * 0.48,
    );
    overlay.data[index + 2] = Math.round(
      reference.data[index + 2] * 0.52 + actual.data[index + 2] * 0.48,
    );
    overlay.data[index + 3] = 255;
  }

  fs.writeFileSync(overlayPath, PNG.sync.write(overlay));
};

test("mobility platforms reference overlay workflow", async ({ page }) => {
  fs.mkdirSync(outputDir, { recursive: true });
  const reference = PNG.sync.read(fs.readFileSync(referencePath));

  await page.setViewportSize({ width: reference.width, height: reference.height });
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

  const section = page.locator(".platforms-section");
  await expect(section).toBeVisible();
  await section.scrollIntoViewIfNeeded();

  const box = await section.boundingBox();
  expect(box, "Mobility Platforms section must have a screenshot box").not.toBeNull();
  console.log(
    `Mobility Platforms section box: ${Math.round(box.width)}x${Math.round(
      box.height,
    )}; reference: ${reference.width}x${reference.height}; reference file: ${referencePath}`,
  );

  await section.screenshot({ path: actualPath, animations: "disabled" });

  const actualRaw = PNG.sync.read(fs.readFileSync(actualPath));
  const actual = copyIntoReferenceCanvas(actualRaw, reference);
  fs.writeFileSync(actualPath, PNG.sync.write(actual));

  writeOverlay(reference, actual);

  const diff = new PNG({ width: reference.width, height: reference.height });
  const diffPixels = pixelmatch(
    reference.data,
    actual.data,
    diff.data,
    reference.width,
    reference.height,
    { threshold: 0.12 },
  );
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = reference.width * reference.height;
  const diffRatio = diffPixels / totalPixels;
  console.log(
    `Mobility Platforms reference diff: ${diffPixels}/${totalPixels} pixels (${(
      diffRatio * 100
    ).toFixed(2)}%). Overlay saved to ${overlayPath}; diff saved to ${diffPath}`,
  );
  console.log("This spec is a design alignment tool only; it does not enforce a CI threshold yet.");

  if (process.env.MOBILITY_MAX_DIFF_RATIO) {
    expect(diffRatio).toBeLessThan(Number.parseFloat(process.env.MOBILITY_MAX_DIFF_RATIO));
  }
});
