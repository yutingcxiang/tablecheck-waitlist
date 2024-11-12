import { render, screen } from '@testing-library/react';
import ReservationDetails from './ReservationDetails';

const mockReservation = {
  id: 4,
  name: '4 Guys',
  party_size: 4,
  position: 2,
};

describe('ReservationDetails', () => {
  test('renders restaurant description', () => {
    render(<ReservationDetails reservation={mockReservation} />);

    expect(screen.getByText("Reservation Details:")).toBeInTheDocument();
    expect(screen.getByText("Name: 4 Guys")).toBeInTheDocument();
    expect(screen.getByText("Party Size: 4")).toBeInTheDocument();
    expect(screen.getByText("Position: 2")).toBeInTheDocument();
  });
});