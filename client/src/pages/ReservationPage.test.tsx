import { render, screen } from '@testing-library/react';
import ReservationPage from './ReservationPage';

describe('ReservationPage', () => {
  test('renders', () => {
    render(<ReservationPage />);

    expect(screen.getByTestId('reservation-page-container')).toBeInTheDocument();
  });
});
