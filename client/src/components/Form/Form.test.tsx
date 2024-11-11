import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import { createReservation } from '../../api/createReservation';

const mockSetReservationInfo = jest.fn();

const name = 'John Doe';
const size = '5';

jest.mock('../../api/createReservation', () => ({
  createReservation: jest.fn(),
}));

describe('Form', () => {
  test('renders restaurant waitlist form', () => {
    render(<Form setReservationInfo={mockSetReservationInfo} />);

    expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
  });

  describe('name input', () => {
    test('renders a name input', () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    });

    test('handles onChange', async () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      const input = screen.getByRole('textbox', { name: 'Name' });

      await userEvent.type(input, name);
      expect(input).toHaveValue(name);
    });
  });

  describe('party size input', () => {
    test('renders a party size input', () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      const input = screen.getByRole('spinbutton', { name: /Party Size/i });
      expect(input).toBeInTheDocument();
    });

    test('handles onChange', async () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      const input = screen.getByRole('spinbutton', { name: /Party Size/i });

      await userEvent.type(input, size);
      expect(input).toHaveValue(parseInt(size));
    });
  });

  describe('submit button', () => {
    test('renders a Join WaitList button', () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      expect(
        screen.getByRole('button', { name: 'Join Waitlist' }),
      ).toBeInTheDocument();
    });

    test('handles onSubmit', async () => {
      render(<Form setReservationInfo={mockSetReservationInfo} />);

      // Fill out name input
      const nameInput = screen.getByRole('textbox', { name: 'Name' });
      await userEvent.type(nameInput, name);

      // Fill out party size input
      const partySizeInput = screen.getByRole('spinbutton', {
        name: /Party Size/i,
      });
      await userEvent.type(partySizeInput, size);

      // Submit form
      const button = screen.getByRole('button', { name: 'Join Waitlist' });
      await userEvent.click(button);

      await waitFor(() => {
        expect(createReservation).toHaveBeenCalledWith({
          name,
          party_size: parseInt(size),
        });
      })
    });
  });
});
