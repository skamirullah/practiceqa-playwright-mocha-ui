import { BasePage } from './basePage.js';

export class ResultsPage extends BasePage {
  get routeTitle() {
    return this.byTestId('route-title');
  }

  get flightCount() {
    return this.byTestId('flight-count');
  }

  get cards() {
    return this.byTestId('flight-card');
  }

  get stops() {
    return this.byTestId('flight-stops');
  }

  /** `count()` does not wait, so callers that count flights wait for the list first. */
  async waitUntilLoaded() {
    await this.cards.first().waitFor();
  }

  async nonStopOnly() {
    await this.byTestId('stops-0').check();
  }

  async sortBy(order) {
    await this.byTestId(`sort-${order}`).click();
  }

  /** Prices of the listed flights as numbers, in the order shown. */
  async prices() {
    const texts = await this.byTestId('flight-price').allTextContents();
    return texts.map((text) => Number(text.replace(/[^\d.]/g, '')));
  }

  /** Expands a flight and picks one of its fares, which moves on to passenger details. */
  async chooseFlight(index, fare) {
    await this.byTestId('select-flight').nth(index).click();
    await this.byTestId(`fare-${fare}`).click();
  }
}
