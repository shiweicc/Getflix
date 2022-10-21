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
    axios.get('/profile/gethistory', {params: {userId: userId,}})
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

  const removeBtnClick = (userId, movieId) => {
    let data = {userId: userId, movieId: movieId}

    let newHistory = history;
    const index = newHistory.indexOf(movieId);
    newHistory.splice(index, 1)

    axios.delete('/profile/removeeachmovie', {params: data})
      .then(data => {
        // console.log('success DELETE the movie from history: ', data)
        setHistory(newHistory);
        alert('This movie is revmoed from your history! Refresh the page to see the update.')
      })
      .catch(err => {
        console.log('fail to DELETE the movie from history: ', err)
      })
  }

  const clearHistoryBtnClick = (userId) => {
    let data = {userId: userId}

    axios.delete('/profile/clearhistory', {params: data})
      .then(data => {
        // console.log('success DELETE all movies from history: ', data)
        setHistory([]);
        alert('History has been cleared!')
      })
      .catch(err => {
        console.log('fail to DELETE all movies from history: ', err)
      })
  }


  const router = createBrowserRouter([
<<<<<<< HEAD
=======
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
      element: <Main updateHistory={watchedBtnClick} history={history}/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile",
      element: <Profile history={history} removeEachMovie={removeBtnClick} removeAllMovies={clearHistoryBtnClick}/>
    },
>>>>>>> 91affb5 (Completed remove btn function and add Clear History btn CSS)
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


