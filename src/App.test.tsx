import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the AFCRulesInfographic component', () => {
    render(<App />);
    expect(screen.getByText('Michigan AFC Rules Comparison')).toBeInTheDocument();
  });
});
