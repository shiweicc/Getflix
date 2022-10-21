import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import Signup from "./components/signup/Signup.js";
import Landing from "./components/landing/landing.js";
import Details from "./components/details/details.js";
// import fakeHistoryData from "./fakeData/fakeHistory.js";
import axios from 'axios';

import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";

function App() {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState({})

  const NotFound = () => {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <br></br>
            <Link to='/login'>Log in</Link>
            <br></br>
            <Link to='/signup'>Create a new account</Link>
        </div>
    )
  }


  useEffect(() => {
    getHistory(1);
  }, [])

  const getHistory = (userId) => {
    axios.get('/profile', {params: {userId: userId,}})
      .then(history => {
        // console.log('success GET history data: ', history)
        setHistory(history.data)
      })
      .catch(err => {
        console.log('fail to GET history data: ', err);
      })
  }

  const watchedBtnClick = (userId, movieId) => {
    let checking = history.includes(movieId);
    if (!checking) {
      axios.post('/main', {userId: userId, movieId: movieId})
        .then(data => {
          // console.log('success POST the watched movie: ', data)
          setHistory([...history, movieId])
        })
        .catch(err => {
          console.log('fail to POST the watched movie:', err);
        })
    } else {
      alert("This movie has been added to the history!");
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login setUser={setUser}/>
    },
    {
      path: "/main",
      element: localStorage.getItem('logged in id') ? <Main updateWatchedList={WatchedBtnClick}/> : <Login setUser={setUser}/>
    },
    {
      path: "/profile",
      element: localStorage.getItem('logged in id') ? <Profile watchedList={watchedMovies}/> : <Login user={user} />
    },
    {
      path: "/details",
      element: localStorage.getItem('logged in id') ? <Details /> : <Login setUser={setUser} />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);


  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

}

export default App;


