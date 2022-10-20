import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Signup from "./components/signup/Signup.js";
import Landing from "./components/landing/landing.js";
import Details from "./components/details/details.js";
import fakeHistoryData from "./fakeData/fakeHistory.js";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [data, setData] = useState(null);
  const [watchedMovies, setwatchedMovies] = useState(fakeHistoryData.history);
  const [logged, isLogged] = useState(false)
  const [user, setUser] = useState({})

  const WatchedBtnClick = (movieID) => {
    setwatchedMovies(prevWatchedList => [...prevWatchedList, movieID])
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/Signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login setLogged={isLogged} setUser={setUser}/>
    },
    {
      path: "/main",
      element: logged ? <Main updateWatchedList={WatchedBtnClick}/> : <Login setLogged={isLogged} setUser={setUser}/>
    },
    {
      path: "/profile",
      element: logged ? <Profile watchedList={watchedMovies}/> : <Login setLogged={isLogged} setUser={setUser} />
    },
    {
      path: "/details",
      element: logged ? <Details /> : <Login setLogged={isLogged} setUser={setUser} />
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
