import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Details from "./components/details/details.js";
import Landing from "./components/landing/landing.js";
import fakeHistoryData from "./fakeData/fakeHistory.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";



function App() {
  const [data, setData] = useState(null);
  const [watchedMovies, setwatchedMovies] = useState(fakeHistoryData.history);
  const [logged, isLogged] = useState(false) // to track if user is logged in
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const WatchedBtnClick = (movieID) => {
    setwatchedMovies(prevWatchedList => [...prevWatchedList, movieID])
  }

  const router = createBrowserRouter([
    {
      path: "/",
      // element:
      //   <div className="App">
      //     <header className="App-header">
      //       <img src={logo} className="App-logo" alt="logo" />
      //       <p>{!data ? "Loading..." : data}</p>
      //     </header>
      //   </div>,
      element: <Landing />
    },
    {
      path: "/main",
      element: logged ? <Main updateWatchedList={WatchedBtnClick}/> : <Login setLogged={isLogged} setUser={setUser}/> // if user is logged, continue, if not redirect to login page
    },
    {
      path: "/login",
      element: <Login setLogged={isLogged} setUser={setUser}/>
    },
    {
      path: "/profile",
      element: logged ? <Profile watchedList={watchedMovies}/> : <Login setLogged={isLogged} setUser={setUser} /> // arr of moviesID
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
