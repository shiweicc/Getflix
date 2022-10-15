import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Details from "./components/details/details.js";
import fakeHistoryData from "./fakeData/fakeHistory.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";



function App() {
  const [data, setData] = useState(null);
  const [watchedMovies, setwatchedMovies] = useState(fakeHistoryData.history);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const WatchedBtnClick = (movieID) => {
    setwatchedMovies(prevWatchedList => [...prevWatchedList, movieID])
    console.log('updated watchedlist: ', watchedMovies)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{!data ? "Loading..." : data}</p>
          </header>
        </div>,
    },
    {
      path: "/main",
      element: <Main updateWatchedList={WatchedBtnClick}/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile",

      element: <Profile watchedList={watchedMovies}/> // arr of moviesID
    },
    {
      path: "/details",
      element: <Details />

    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;