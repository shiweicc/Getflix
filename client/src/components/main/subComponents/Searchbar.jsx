import React from 'react';

var searchBar = (props) => (
  <div>
    <div className='main-sb Navigation-Bar'>
      <input data-testid="search" type="search" maxLength="150" onChange={props.query} placeholder="Search for your movie here"></input>
    </div>
  </div>
);

export default searchBar;