import { BasePage } from './basePage.js';

export class PaymentPage extends BasePage {
  get total() {
    return this.byTestId('flight-total');
  }

  async payWithCard({ number, expiry, cvv }) {
    await this.byTestId('card-number').fill(number);
    await this.byTestId('card-expiry').fill(expiry);
    await this.byTestId('card-cvv').fill(cvv);
    await this.byTestId('pay-flight').click();
  }
}
