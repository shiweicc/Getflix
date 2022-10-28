import React from 'react';
import ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, within, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, ReactTestUtils } from 'react-dom/test-utils';

import fakeData from "../../fakeData/fakeMovies.js";
import Main from './main.js';
import Carousel from './subComponents/carousel.jsx';
import axios from "axios";

jest.mock("axios");

describe('test', () => {
  let container;
  const promise = Promise.resolve();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // render(
    // <BrowserRouter>
    //     <Main />
    // </BrowserRouter>);
  });

  afterEach(async () => {
    document.body.removeChild(container);
    container = null;
    await waitFor(async () => {
      await promise;
    })
  })

  it('renders Main component without crashing', () => {
    axios.get.mockResolvedValue({ data: fakeData.movies });
    act(() => {
      ReactDOM.createRoot(container).render(<BrowserRouter>
        <Main />
    </BrowserRouter>)
    });
    let search = screen.getByText('Comedy');
    expect(search).toBeInTheDocument();
  });

  it('renders carousel component without crashing', () => {
    render(
    <BrowserRouter>
        <Carousel
        movies = {fakeData.movies}
        updateHistory={''}
        history={''}
        userId={''}
        userName={''}/>
    </BrowserRouter>);
    let search = screen.getByText('Orphan: First Kill');
    expect(search).toBeInTheDocument();
  });

  it('shows movies after typing in the searchbar', async () => {
    axios.get.mockResolvedValue({ data: fakeData.movies });
    act(() => {
      ReactDOM.createRoot(container).render(<BrowserRouter>
        <Main />
    </BrowserRouter>)
    });
    await (async () => {
      expect(screen.getByTestId('search')).toBeVisible();
      userEvent.type(screen.getByTestId('search'), 'Orphan');
      let search = screen.getByText('Orphan');
      expect(search).toBeInTheDocument();
    })
  });

  it('render page without any movies', async () => {
    axios.get.mockResolvedValue({ data: [] });
    act(() => {
      ReactDOM.createRoot(container).render(<BrowserRouter>
        <Main />
    </BrowserRouter>)
    });
    await (async () => {
      let search = screen.getByText('Orphan: First Kill');
      expect(search).toBeInTheDocument();
    })
  });

  it('should click on profile and move to profile page', async () => {
    axios.get.mockResolvedValue({ data: fakeData.movies });
    act(() => {
      ReactDOM.createRoot(container).render(<BrowserRouter>
        <Main />
    </BrowserRouter>)
    });
    await (async () => {
      expect(screen.getByTestId('search')).toBeVisible();
      await userEvent.click(screen.getByTestId('profile'));
      let search = screen.getByText('Orphan');
      expect(search).toNotBeInTheDocument();
    })
  });

});
