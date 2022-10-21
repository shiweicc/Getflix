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

  const [history, setHistory] = useState([]);

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