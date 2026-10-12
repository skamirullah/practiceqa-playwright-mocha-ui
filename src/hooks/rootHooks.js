// Mocha root hooks: one browser per worker, a fresh context and page per test,
// and a screenshot plus a Playwright trace saved for every test that fails.
import fs from 'node:fs';
import path from 'node:path';
import * as playwright from '@playwright/test';
import addContext from 'mochawesome/addContext.js';
import { env } from '../config/env.js';

let browser;

const fileSafe = (title) => title.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 80);

export const mochaHooks = {
  async beforeAll() {
    this.timeout(60_000);
    browser = await playwright[env.browser].launch({ headless: env.headless, slowMo: env.slowMo });
  },

  async beforeEach() {
    this.context = await browser.newContext({ baseURL: env.baseUrl, viewport: { width: 1366, height: 900 } });
    this.context.setDefaultTimeout(env.actionTimeout);
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
  },

  async afterEach() {
    const failed = this.currentTest.state === 'failed';
    if (failed) {
      fs.mkdirSync(env.artifactsDir, { recursive: true });
      const name = fileSafe(this.currentTest.fullTitle());
      const screenshot = path.join(env.artifactsDir, `${name}.png`);
      await this.page.screenshot({ path: screenshot, fullPage: true });
      await this.context.tracing.stop({ path: path.join(env.artifactsDir, `${name}.zip`) });
      addContext(this, { title: 'Screenshot at failure', value: path.resolve(screenshot) });
    } else {
      await this.context.tracing.stop();
    }
    await this.context.close();
  },

  async afterAll() {
    await browser?.close();
  },
};
