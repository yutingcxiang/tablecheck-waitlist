import { render, screen } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  test('renders restaurant waitlist form', () => {
    render(<Form />);

    expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
  });

  test('renders a name input', () => {
    render(<Form />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  test('renders a party size input', () => {
    render(<Form />);

    const input = screen.getByRole('textbox', { name: /Party Size/i });
    expect(input).toBeInTheDocument();
  });


  test('renders a Join WaitList button', () => {
    render(<Form />);

    expect(screen.getByRole("button", { name: 'Join Waitlist'})).toBeInTheDocument();
  });
});
