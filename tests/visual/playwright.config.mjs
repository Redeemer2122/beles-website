/* global process */

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  outputDir: "./test-results",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    deviceScaleFactor: 1,
    viewport: { width: 1672, height: 941 },
  },
});
