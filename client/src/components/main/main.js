import React from "react";
import NavigationBar from "./subComponents/NavigationBar.jsx";
import { useNavigate } from 'react-router-dom';
//import fakeData from "../../fakeData/fakeMovies.js";
import './main.css';
import Movies from "./subComponents/movies.jsx";
import axios from "axios";


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
  const [filtered, setFiltered] = React.useState({
    filtered: []
  })
  const [allMovies, setMovies] = React.useState({
    movies: []
  })
  React.useEffect(() => {
    //get data from API
    // let movies = fakeData.movies;
    // setMovies(movies)
    // let moviesObj = {}
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

    // for live data

    axios.get('/main')
      .then(data => {
        let movies = data.data;
        setMovies(movies)
        // sort movies grouped by genre
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
      })
  }, []);

  const search = (e) => {
    console.log(e.target.value)
    if (e.target.value.length === 0) {
      setFiltered([])
    } else {
      let filteredMovies = [];
      allMovies.forEach(movie => {
        if (movie.original_title.toLowerCase().includes(e.target.value)) {
          filteredMovies.push(movie)
        }
      })
      // filteredMovies = filteredMovies.slice(0,4)
      setFiltered(filteredMovies)
    }
  }

  const profile = () => {

    // console.log('profile button')
    navigate('/profile')

  }
  const navigateToLandingPage = () => {
    navigate('/');
  };
  const logout = () => {
    // console.log('logout button')
    localStorage.removeItem('logged in id');
    navigateToLandingPage();
  }

  const navigateMovieDetail = (data) => {
    navigate('/details', { state: data });
  }

  return (
    <div className="Main">
        <NavigationBar
          search = {search}
          filtered = {filtered}
          profile = {profile}
          logout = {logout}
          detail = {navigateMovieDetail}
          />
          <Movies
            movieList = {groupedMovies}
            updateHistory={props.updateHistory}
            history={props.history}
            userId={props.userId}
          />
    </div>
  );
}

export default Main;