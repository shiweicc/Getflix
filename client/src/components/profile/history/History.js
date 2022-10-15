import React, { useState, useEffect } from "react";
import Movielist from "./subComponents/history_movieList.jsx";



const History = (props) => {
  console.log('history here: ', props)
  // const [watchedMovies, setwatchedMovies] = useState(fakeHistoryData.movies);

  return (
    <div className="history">
      <h2 className='history-title'>History</h2>
      <Movielist movies={props.watchedList}/>
    </div>
  );
}

export default History;
