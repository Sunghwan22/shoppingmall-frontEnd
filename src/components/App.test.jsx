const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { default: App } = require('./App');

test('App', () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));

  screen.getByText('Hello, world');
});
