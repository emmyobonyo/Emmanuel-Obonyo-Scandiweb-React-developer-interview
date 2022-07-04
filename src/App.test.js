import { render, screen } from '@testing-library/react';
import Header from './components/header/Header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/All/i);
  expect(linkElement).toBeInTheDocument();
});
