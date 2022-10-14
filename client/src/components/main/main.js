import React from "react";
import NavigationBar from "./subComponents/NavigationBar.jsx";
import fakeData from "../../fakeData/fakeMovies.js";
import './main.css';
import Movies from "./subComponents/movies.jsx";

function Main(props) {
  // const [data, setData] = React.useState(null);
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
    // sort movies grouped by genre
    movies.forEach(movie => {
      movie.genre_ids.forEach(genre => {
        let moviedata = {
          id: movie.id,
          original_title: movie.original_title,
          popularity: movie.popularity,
          backdrop_path: movie.backdrop_path
        }
        if (moviesObj[genre] === undefined) {
          moviesObj[genre] = [moviedata]
        } else {
          moviesObj[genre].push(moviedata)
        }
      })
      // console.log(moviesObj)
    })
    setgroupedMovies(moviesObj)
  }, []);

  return (
    <div className="Main">
      <NavigationBar />
      <Movies
        movieList = {groupedMovies}
        updateWatchedList={props.updateWatchedList}
      />
    </div>
  );
}

export default Main;