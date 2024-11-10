import { render, screen } from '@testing-library/react';
import Info from './Info';

describe('Info', () => {
  test('renders restaurant description', () => {
    render(<Info />);
    
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByText("Welcome to Bob's Burgers.")).toBeInTheDocument();
  });

  test('renders restaurant total capacity', () => {
    render(<Info />);

    expect(screen.getByTestId('total-capacity')).toBeInTheDocument();
    expect(screen.getByText("Total Capacity: 10")).toBeInTheDocument();
  });
});
