import { render, screen } from '@testing-library/react';
import RestaurantInfo from './RestaurantInfo';

describe('RestaurantInfo', () => {
  test('renders restaurant description', () => {
    render(<RestaurantInfo />);

    expect(screen.getByText("Welcome to Bob's Burgers!")).toBeInTheDocument();
  });
});
