import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  test('renders app title', () => {
    render(<App />);
    const element = screen.getByText("Waitlist Manager");
    expect(element).toBeInTheDocument();
  });
});
