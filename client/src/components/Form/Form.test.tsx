import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  test('renders restaurant waitlist form', () => {
    render(<Form />);

    expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
  });

  describe('name input', () => {
    test('renders a name input', () => {
      render(<Form />);

      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    });

    test('handles onChange', async () => {
      const name = 'John Doe';
      render(<Form />);

      const input = screen.getByRole('textbox', { name: 'Name' });

      await userEvent.type(input, name);
      expect(input).toHaveValue(name);
    });
  });

  describe('party size input', () => {
    test('renders a party size input', () => {
      render(<Form />);

      const input = screen.getByRole('spinbutton', { name: /Party Size/i });
      expect(input).toBeInTheDocument();
    });

    test('handles onChange', async () => {
      const size = "5";
      render(<Form />);

      const input = screen.getByRole('spinbutton', { name: /Party Size/i });

      await userEvent.type(input, size);
      expect(input).toHaveValue(parseInt(size));
    });
  });

  test('renders a Join WaitList button', () => {
    render(<Form />);

    expect(
      screen.getByRole('button', { name: 'Join Waitlist' }),
    ).toBeInTheDocument();
  });
});
