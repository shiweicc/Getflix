import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Landing from "./components/landing/landing.js";
import Details from "./components/details/details.js";
// import fakeHistoryData from "./fakeData/fakeHistory.js";
import axios from 'axios';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //     fetch("/test")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const [watchedMovies, setwatchedMovies] = useState(null);

  useEffect(() => {
    getWatchedMovies(1);
  }, [])

  const getWatchedMovies = (userId) => {
    axios.get('/profile', {params: {userId: userId,}})
    .then(watchedMoviesList => {
      console.log('GET at APP: ', watchedMoviesList)
      setwatchedMovies(watchedMoviesList.data)
    })
    .catch(err => {
      console.log('fail to get watched movies list!!!', err);
    })
  }

  const watchedBtnClick = (movieId) => {
    setwatchedMovies(prevWatchedList => [...prevWatchedList, movieId])
    console.log('updated watchedlist: ', watchedMovies)
  }

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element:
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>{!data ? "Loading..." : data}</p>
    //       </header>
    //     </div>,
    // },
    {
      path: "/main",
      element: <Main updateWatchedList={watchedBtnClick}/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile",
      element: <Profile watchedList={watchedMovies}/>
    },
    {
      path: "/",
      element: <Landing />
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