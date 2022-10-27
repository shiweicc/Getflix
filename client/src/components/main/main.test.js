import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, within, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, ReactTestUtils } from 'react-dom/test-utils';

import Main from './main.js';



describe('test', () => {

  const promise = Promise.resolve();

  beforeEach(() => {
  });

  afterEach(async () => {
    await waitFor(async () => {
      await promise;
    })
  })


  it('renders Main component without crashing', () => {
    render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>);
    let search = screen.getByText('Comedy');
    expect(search).toBeInTheDocument();
  });

});

// test('renders Main component without crashing', async () => {
//   render (<Main />);
//   let search = screen.getByText('Search for your movie here');
//   expect(search).toBeInTheDocument();
// })