import React from 'react';

var searchBar = (props) => (
  <div className='main-sb-container'>
    <div className='main-sb'>
      <input data-testid="search" width='500' type="search" maxLength="150" onChange={(e) => {props.search(e)}} placeholder="Search for your movie here"></input>
    </div>
  </div>
);

export default searchBar;