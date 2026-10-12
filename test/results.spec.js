import { expect } from '@playwright/test';
import { airports } from '../src/data/trip.js';
import { pagesFor } from '../src/pages/index.js';

describe('SkyWays: filtering and sorting results', function () {
  beforeEach(async function () {
    this.app = pagesFor(this.page);
    await this.app.search.open();
    await this.app.search.searchOneWay({ from: airports.mumbai, to: airports.delhi });
    await this.app.results.waitUntilLoaded();
  });

  it('shows a count that matches the number of flights listed', async function () {
    const { results } = this.app;

    const listed = await results.cards.count();

    await expect(results.flightCount).toHaveText(`${listed} flight${listed === 1 ? '' : 's'}`);
  });

  it('keeps only non-stop flights when the filter is on', async function () {
    const { results } = this.app;
    const before = await results.cards.count();

    await results.nonStopOnly();

    await expect(results.stops.first()).toHaveText('Non-stop');
    for (const stop of await results.stops.allTextContents()) expect(stop).toBe('Non-stop');
    expect(await results.cards.count()).toBeLessThanOrEqual(before);
  });

  it('sorts the cheapest flight first', async function () {
    const { results } = this.app;

    await results.sortBy('cheapest');

    await expect(async () => {
      const prices = await results.prices();
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    }).toPass();
  });
});
