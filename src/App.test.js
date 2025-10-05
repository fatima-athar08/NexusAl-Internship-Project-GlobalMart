import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main welcome heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to GlobalMart/i);
  expect(headingElement).toBeInTheDocument();
});