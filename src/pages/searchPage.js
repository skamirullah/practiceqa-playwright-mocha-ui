import { BasePage } from './basePage.js';

export class SearchPage extends BasePage {
  async open() {
    await this.page.goto('/apps/flights');
  }

  async chooseTrip(type) {
    await this.byTestId(`trip-${type}`).click();
  }

  /** Types into the autocomplete and picks the airport from the suggestion list. */
  async chooseCity(field, { query, code }) {
    await this.byTestId(`${field}-city`).fill(query);
    await this.byTestId(`${field}-option-${code}`).click();
  }

  /** Days are offered as chips; `index` 0 is the first selectable day. */
  async pickDepartDay(index) {
    await this.byTestId('depart-day').nth(index).click();
  }

  async addAdults(extra) {
    await this.byTestId('passengers-toggle').click();
    for (let i = 0; i < extra; i++) await this.byTestId('adults-inc').click();
    await this.byTestId('passengers-done').click();
  }

  async chooseCabin(cabin) {
    await this.byTestId('cabin-class').selectOption(cabin);
  }

  async submit() {
    await this.byTestId('search-flights').click();
  }

  /** Fills the whole form for a one-way trip and submits it. */
  async searchOneWay({ from, to, departDay = 1, extraAdults = 0, cabin = 'economy' }) {
    await this.chooseTrip('oneway');
    await this.chooseCity('from', from);
    await this.chooseCity('to', to);
    await this.pickDepartDay(departDay);
    if (extraAdults) await this.addAdults(extraAdults);
    await this.chooseCabin(cabin);
    await this.submit();
  }

  get passengersSummary() {
    return this.byTestId('passengers-summary');
  }

  get errors() {
    return this.byTestId('search-errors').getByRole('listitem');
  }
}
