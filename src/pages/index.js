import { PassengersPage } from './passengersPage.js';
import { PaymentPage } from './paymentPage.js';
import { ResultsPage } from './resultsPage.js';
import { SearchPage } from './searchPage.js';
import { SeatsPage } from './seatsPage.js';
import { TicketPage } from './ticketPage.js';

/** Builds every page object for one Playwright page, so tests write `const { search, results } = pagesFor(this.page)`. */
export function pagesFor(page) {
  return {
    search: new SearchPage(page),
    results: new ResultsPage(page),
    passengers: new PassengersPage(page),
    seats: new SeatsPage(page),
    payment: new PaymentPage(page),
    ticket: new TicketPage(page),
  };
}
