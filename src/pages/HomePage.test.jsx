import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('example', () => {
  render(<HomePage />);

  screen.getByText('Hello, world');
});
