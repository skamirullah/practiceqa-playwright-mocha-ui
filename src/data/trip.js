// Test data lives here, not in the tests. All of it is fictional.
export const airports = Object.freeze({
  mumbai: { query: 'Mum', code: 'bom', name: 'Mumbai' },
  delhi: { query: 'Del', code: 'del', name: 'Delhi' },
});

export const travellers = Object.freeze([
  { title: 'mr', first: 'Amir', last: 'Khan' },
  { title: 'ms', first: 'Sara', last: 'Khan' },
]);

export const contact = Object.freeze({ email: 'amir@example.com', phone: '9876543210' });

export const cards = Object.freeze({
  valid: { number: '4242424242424242', expiry: '1230', cvv: '123' },
  tooShort: { number: '4242', expiry: '1230', cvv: '123' },
});
