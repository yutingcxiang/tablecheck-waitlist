import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test('renders app title', () => {
    render(<App />);
    const linkElement = screen.getByText("Waitlist Manager");
    expect(linkElement).toBeInTheDocument();
  });
});
