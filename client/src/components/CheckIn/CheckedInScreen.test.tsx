import { render, screen } from '@testing-library/react';
import CheckedInScreen from './CheckedInScreen';

describe('CheckedInScreen', () => {
  test('renders restaurant description', () => {
    render(<CheckedInScreen />);

    expect(screen.getByText('Successfully Checked In!')).toBeInTheDocument();
  });

  test('renders form instructions', () => {
    render(<CheckedInScreen />);

    expect(screen.getByText('Please enjoy your meal!')).toBeInTheDocument();
  });
});
