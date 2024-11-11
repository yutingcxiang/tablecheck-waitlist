import { render, screen } from '@testing-library/react';
import RestaurantInfo from './RestaurantInfo';

describe('RestaurantInfo', () => {
  test('renders restaurant description', () => {
    render(<RestaurantInfo />);

    expect(screen.getByText("Welcome to Bob's Burgers!")).toBeInTheDocument();
  });

  test('renders form instructions', () => {
    render(<RestaurantInfo />);

    expect(
      screen.getByText('Please enter your info below to join our waitlist.'),
    ).toBeInTheDocument();
  });
});
