import React from "react";
import NavigationBar from "./subComponents/NavigationBar.jsx";
import fakeData from "../../fakeData/fakeMovies.js";
import './main.css';
import Movies from "./subComponents/movies.jsx";

function Main() {
  // const [data, setData] = React.useState(null);

  React.useEffect(() => {
    //get data from API
    let movies = fakeData.movies;
    console.log(movies)
  }, []);


  return (
    <div className="Main">
      <NavigationBar />
      <Movies />
    </div>
  );
}

export default Main;