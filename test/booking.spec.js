import { expect } from '@playwright/test';
import { airports, cards, contact, travellers } from '../src/data/trip.js';
import { pagesFor } from '../src/pages/index.js';

describe('SkyWays: booking a flight', function () {
  beforeEach(async function () {
    this.app = pagesFor(this.page);
    const { search, results } = this.app;
    await search.open();
    await search.searchOneWay({ from: airports.mumbai, to: airports.delhi, extraAdults: 1 });
    await results.nonStopOnly();
    await results.sortBy('cheapest');
    await results.chooseFlight(0, 'flex');
    await expect(this.page).toHaveURL(/\/apps\/flights\/passengers/);
  });

  async function fillTravellers(passengers) {
    for (const [index, traveller] of travellers.entries()) await passengers.fillTraveller(index, traveller);
    await passengers.fillContact(contact);
    await passengers.continue();
  }

  it('@smoke books a one-way flight for two with chosen seats', async function () {
    const { passengers, seats, payment, ticket } = this.app;

    await fillTravellers(passengers);
    await seats.pickSeats(travellers.length);
    await expect(seats.assignedSeat(1)).not.toHaveText('—');
    await seats.continue();
    await payment.payWithCard(cards.valid);

    await expect(ticket.confirmation).toBeVisible();
    await expect(ticket.pnr).toHaveText(/^[A-Z0-9]{6}$/);
    await expect(ticket.passengers).toHaveCount(travellers.length);
    await expect(ticket.passengers.nth(1)).toContainText('Sara Khan');
  });

  it('assigns seats at check-in when seat selection is skipped', async function () {
    const { passengers, seats, payment, ticket } = this.app;

    await fillTravellers(passengers);
    await seats.skip();
    await payment.payWithCard(cards.valid);

    await expect(ticket.confirmation).toBeVisible();
    await expect(ticket.seat(0)).toHaveText('at check-in');
  });

  it('charges the amount shown on the payment page', async function () {
    const { passengers, seats, payment, ticket } = this.app;

    await fillTravellers(passengers);
    await seats.skip();
    const quoted = await payment.total.textContent();
    await payment.payWithCard(cards.valid);

    await expect(ticket.total).toHaveText(quoted);
  });

  it('flags the traveller fields that are missing or invalid', async function () {
    const { passengers } = this.app;

    await passengers.fillTraveller(0, { title: 'mr', first: 'A', last: 'Khan' });
    await passengers.continue();

    await expect(passengers.errorBanner).toHaveText('Please check the highlighted fields.');
    await expect(passengers.fieldError('pax-0-first')).toHaveText('Letters only, 2+ characters');
    await expect(passengers.fieldError('contact-email')).toHaveText('Enter a valid email');
    await expect(passengers.fieldError('contact-phone')).toHaveText('Phone must be 10 digits');
  });

  it('rejects a card number that is not 16 digits', async function () {
    const { passengers, seats, payment } = this.app;

    await fillTravellers(passengers);
    await seats.skip();
    await payment.payWithCard(cards.tooShort);

    await expect(this.page.getByText('Card number must be 16 digits')).toBeVisible();
    await expect(this.page).toHaveURL(/\/apps\/flights\/payment/);
  });
});
