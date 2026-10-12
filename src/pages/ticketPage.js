import { BasePage } from './basePage.js';

export class TicketPage extends BasePage {
  get confirmation() {
    return this.byTestId('ticket-confirmed');
  }

  get pnr() {
    return this.byTestId('booking-pnr');
  }

  get passengers() {
    return this.byTestId('ticket-passenger');
  }

  seat(index) {
    return this.byTestId(`ticket-seat-${index}`);
  }

  get total() {
    return this.byTestId('ticket-total');
  }
}
