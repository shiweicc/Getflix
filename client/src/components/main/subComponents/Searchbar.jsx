var searchBar = (props) => (
  <div className='main-sb-container'>
    <div className='main-sb'>
      <input data-testid="search" className='sb'id='searchbar' width='500' type="search" maxLength="150" onChange={(e) => {props.search(e)}} placeholder="Search for your movie here"></input>
    </div>
    {props.filtered && props.filtered.length > 0 && (
      <div className='search-container'>
        {props.filtered.map((movie, key) => {
          return (
            <div className='search-item' onClick={()=> { props.detail(movie) }}>
              <img
                src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
                alt = {movie.original_title}
                className='search-img'
              />
              <div className='search-title'>{movie.original_title}</div>
            </div>
          )
        })}
      </div>
    )}
  </div>
);

export default searchBar;