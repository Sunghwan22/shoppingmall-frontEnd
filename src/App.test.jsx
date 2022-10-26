const { render, screen } = require('@testing-library/react');
const { default: App } = require('./App');

test('App', () => {
  render(<App />);

  screen.getByText('Hello, world');
});
