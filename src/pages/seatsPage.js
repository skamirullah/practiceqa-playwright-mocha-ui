import { BasePage } from './basePage.js';

export class SeatsPage extends BasePage {
  get availableSeats() {
    return this.page.locator('[data-testid^="seat-"][data-status="available"]');
  }

  /** Picks the first free seat for each traveller; the map moves to the next traveller by itself. */
  async pickSeats(travellers) {
    for (let i = 0; i < travellers; i++) await this.availableSeats.first().click();
  }

  assignedSeat(index) {
    return this.byTestId(`assigned-seat-${index}`);
  }

  async continue() {
    await this.byTestId('continue-to-payment').click();
  }

  async skip() {
    await this.byTestId('skip-seats').click();
  }
}
