import { render, screen } from '@testing-library/react';
import CheckedInScreen from './CheckedInScreen';

const mockHandleCheckOut = jest.fn();

describe('CheckedInScreen', () => {
  test('renders confirmation message', () => {
    render(<CheckedInScreen handleCheckOut={mockHandleCheckOut} />);

    expect(screen.getByText('Successfully Checked In')).toBeInTheDocument();
    expect(screen.getByText('Please enjoy your meal!')).toBeInTheDocument();
  });
});
