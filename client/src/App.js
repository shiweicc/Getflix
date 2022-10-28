import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/main/main.js";
import Login from "./components/login/login.js";
import Profile from "./components/profile/Profile.js";
import UpdateUsername from "./components/profile/history/subComponents/UpdateUsername.js";
import UpdatePwd from "./components/profile/history/subComponents/UpdatePwd.js";
import Signup from "./components/signup/Signup.js";
import Landing from "./components/landing/landing.js";
import Details from "./components/details/details.js";
import axios from 'axios';

import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState({})
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('logged in id')
  const userName = localStorage.getItem('logged in name')
  const userEmail = localStorage.getItem('useremail')

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
    getHistory(userId);
  }, [userId])


  const getHistory = (userId) => {
    axios.get(`/profile/gethistory`, {params: {userId: userId}})
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
      axios.post('/main/updatehistory', {userId: userId, movieId: movieId})
        .then(data => {
          setHistory([...history, movieId])
        })
        .catch(err => {
          console.log('fail to POST the watched movie:', err);
        })
    } else {
      alert("This movie has been added to the history!");
    }
  }

  const removeBtnClick = (userId, movieId) => {
    let data = {userId: userId, movieId: movieId}

    let newHistory = history;
    const index = newHistory.indexOf(movieId);
    newHistory.splice(index, 1)


    axios.delete('/profile/removeeachmovie', {params: data})
      .then(data => {
        setHistory(newHistory);
      })
      .catch(err => {
        console.log('fail to DELETE the movie from history: ', err)
      })
  }

  const clearHistoryBtnClick = (userId) => {
    let data = {userId: userId}

    axios.delete('/profile/clearhistory', {params: data})
      .then(data => {
        setHistory([]);
      })
      .catch(err => {
        console.log('fail to DELETE all movies from history: ', err)
      })
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
      element: localStorage.getItem('logged in id') ?
      <Main updateHistory={watchedBtnClick} history={history} userId={userId} userName={userName}/>
      : <Login setUser={setUser}/>
    },
    {
      path: "/profile",
      element: localStorage.getItem('logged in id')
      ? <Profile
          history={history} removeEachMovie={removeBtnClick}
          removeAllMovies={clearHistoryBtnClick}
          userId={userId}
          userName={userName}
          userEmail={userEmail}/>
      : <Login user={user} />
    },
    {
      path: "/updateUserPwd",
      element: localStorage.getItem('logged in id')
      ? <UpdatePwd userId={userId}/>
      : <Login user={user} />
    },
    {
      path: "/updateUserName",
      element: localStorage.getItem('logged in id')
      ? <UpdateUsername userId={userId}/>
      : <Login user={user} />
    },
    {
      path: "/details",
      element: localStorage.getItem('logged in id')
      ? <Details updateHistory={watchedBtnClick} history={history} userId={userId} userName={userName}/>
      : <Login setUser={setUser} />
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