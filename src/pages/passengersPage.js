import { BasePage } from './basePage.js';

export class PassengersPage extends BasePage {
  async fillTraveller(index, { title, first, last }) {
    await this.byTestId(`pax-${index}-title`).selectOption(title);
    await this.byTestId(`pax-${index}-first`).fill(first);
    await this.byTestId(`pax-${index}-last`).fill(last);
  }

  async fillContact({ email, phone }) {
    await this.byTestId('contact-email').fill(email);
    await this.byTestId('contact-phone').fill(phone);
  }

  async continue() {
    await this.byTestId('continue-to-seats').click();
  }

  get errorBanner() {
    return this.byTestId('passenger-errors');
  }
}
