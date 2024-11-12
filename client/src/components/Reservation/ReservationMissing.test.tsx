import { render, screen } from '@testing-library/react';
import ReservationMissing from './ReservationMissing';

describe('ReservationMissing', () => {
  test('renders restaurant description', () => {
    render(<ReservationMissing />);

    expect(screen.getByText("Reservation Not Found")).toBeInTheDocument();
  });
});
