import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders the Vite + React link', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});
