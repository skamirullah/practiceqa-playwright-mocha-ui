/** Shared behaviour for every page object. Pages expose intent ("search", "pay"), never raw selectors. */
export class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  /** The app marks every interactive element with data-testid. */
  byTestId(id) {
    return this.page.getByTestId(id);
  }

  /** Inline error shown under a form field. */
  fieldError(fieldId) {
    return this.byTestId(`error-${fieldId}`);
  }
}
