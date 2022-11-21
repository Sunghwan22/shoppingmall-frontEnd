Feature('home');

Scenario('Visit the home page', ({ I }) => {
  I.amOnPage('/');

  I.see('Hello, world');
});
