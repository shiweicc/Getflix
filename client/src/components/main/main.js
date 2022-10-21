import React from "react";
import NavigationBar from "./subComponents/NavigationBar.jsx";
import { useNavigate } from 'react-router-dom';
import fakeData from "../../fakeData/fakeMovies.js";
import './main.css';
import Movies from "./subComponents/movies.jsx";
<<<<<<< HEAD
import $ from "jquery";
import { useNavigate } from 'react-router-dom';
=======


>>>>>>> bcca1d6 (Completed dynamically display watched movies in history carousel and added navigation for buttons)
function Main(props) {
  // const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const [groupedMovies, setgroupedMovies] = React.useState({
    35: [],
    53: [],
    28: [],
    14: [],
    18: [],
    10751: [],
  });
  React.useEffect(() => {
    //get data from API
    let movies = fakeData.movies;
    let moviesObj = {}
        movies.forEach(movie => {
          movie.genre_ids.forEach(genre => {
            let moviedata = {
              id: movie.id,
              original_title: movie.original_title,
              popularity: movie.popularity,
              backdrop_path: movie.backdrop_path,
              poster_path: movie.poster_path,
              overview: movie.overview
            }
            if (moviesObj[genre] === undefined) {
              moviesObj[genre] = [moviedata]
            } else {
              moviesObj[genre].push(moviedata)
            }
          })
        })
        setgroupedMovies(moviesObj)

    // for live data

    // $.ajax({
    //   url: 'http://localhost:3002/main',
    //   method: 'get',
    //   // dataType: "javascipt",
    //   success: (data) => {
    //     let movies = data.data;
    //     console.log(movies)
    //     // sort movies grouped by genre
    //     let moviesObj = {}
    //     movies.forEach(movie => {
    //       movie.genre_ids.forEach(genre => {
    //         let moviedata = {
    //           id: movie.id,
    //           original_title: movie.original_title,
    //           popularity: movie.popularity,
    //           backdrop_path: movie.backdrop_path,
    //           poster_path: movie.poster_path,
    //           overview: movie.overview
    //         }
    //         if (moviesObj[genre] === undefined) {
    //           moviesObj[genre] = [moviedata]
    //         } else {
    //           moviesObj[genre].push(moviedata)
    //         }
    //       })
    //     })
    //     setgroupedMovies(moviesObj)
    //   }
    // })
  }, []);

  const search = (e) => {
    console.log(e.target.value)
  }

  const profile = () => {
    navigate('/profile');
  }
  const navigateToLandingPage = () => {
    navigate('/');
  };
  const logout = () => {
    // console.log('logout button')
    localStorage.removeItem('logged in id');
    navigateToLandingPage();
  }

  return (
    <div className="Main">
      <NavigationBar
        search = {search}
        profile = {profile}
        logout = {logout}
        />
      <Movies
        movieList = {groupedMovies}
        updateWatchedList={props.updateWatchedList}
      />
    </div>
  );
}

export default Main;