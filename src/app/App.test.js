import React from 'react';
import { getByRole, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('RedditCreeper React Web App', () => {
  test('renders a header and a footer', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    expect(getByRole(/contentinfo/i)).toBeInTheDocument();
    expect(getByRole(/banner/i)).toBeInTheDocument();
  });
});

