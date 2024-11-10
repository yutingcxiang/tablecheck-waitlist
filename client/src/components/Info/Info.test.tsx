import { render, screen } from '@testing-library/react';
import Info from './Info';

test('renders restaurant info', () => {
  render(<Info />);
  const description = screen.getByTestId("description");
  expect(description).toBeInTheDocument();
});
