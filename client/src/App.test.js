import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
});

test('renders the logo', () => {
  render(<App />);
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});

test('has correct header styles', () => {
  render(<App />);
  const header = screen.getByRole('banner');
  expect(header).toHaveStyle(`
    background-color: #282c34;
    color: white;
  `);
});
