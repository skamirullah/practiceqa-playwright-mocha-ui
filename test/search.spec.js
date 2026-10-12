import { expect } from '@playwright/test';
import { airports } from '../src/data/trip.js';
import { pagesFor } from '../src/pages/index.js';

describe('SkyWays: searching for flights', function () {
  beforeEach(async function () {
    this.app = pagesFor(this.page);
    await this.app.search.open();
  });

  it('@smoke finds flights for a one-way trip', async function () {
    const { search, results } = this.app;

    await search.searchOneWay({ from: airports.mumbai, to: airports.delhi });

    await expect(this.page).toHaveURL(/\/apps\/flights\/results/);
    await expect(results.routeTitle).toContainText(airports.mumbai.name);
    await expect(results.routeTitle).toContainText(airports.delhi.name);
    await expect(results.cards.first()).toBeVisible();
  });

  it('lists every missing field when the form is submitted empty', async function () {
    const { search } = this.app;

    await search.submit();

    await expect(search.errors).toHaveText([
      'Choose a departure city from the list',
      'Choose a destination from the list',
      'Pick a departure date',
    ]);
    await expect(this.page).toHaveURL(/\/apps\/flights$/);
  });

  it('asks for a return date on a round trip', async function () {
    const { search } = this.app;

    await search.chooseTrip('round');
    await search.chooseCity('from', airports.mumbai);
    await search.chooseCity('to', airports.delhi);
    await search.pickDepartDay(1);
    await search.submit();

    await expect(search.errors).toHaveText(['Pick a return date']);
  });

  it('summarises the travellers after adding an adult', async function () {
    const { search } = this.app;

    await search.addAdults(1);

    await expect(search.passengersSummary).toContainText('2 adults');
  });
});
