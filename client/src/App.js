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

  const [watchedList, setWatchedList] = useState([]);

  useEffect(() => {
    getHistory(1);
  }, [])

  const getHistory = (userId) => {
    axios.get('/profile', {params: {userId: userId,}})
      .then(history => {
        console.log('success GET history data: ', history)
        setWatchedList(history.data)
      })
      .catch(err => {
        console.log('fail to GET history data: ', err);
      })
  }

  const watchedBtnClick = (userId, movieId) => {
    // setwatchedMovies([...watchedMovies, movieId])
    // console.log('updated watchedlist: ', watchedMovies)

    axios.post('/main', {userId: userId, movieId: movieId})
      .then(data => {
        console.log('success POST the watched movie: ', data)
      })
      .catch(err => {
        console.log('fail to POST the watched movie:', err);
      })
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
      element: <Profile watchedList={watchedList}/>
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