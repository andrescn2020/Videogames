import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (

    <div>
      <h1>Welcome</h1>
      <aside className='exploreContainer'>
        <Link style={{ "textDecoration": "none" }} to="api/videogames/">
          <button className='exploreLink'>Explore</button>
        </Link>
      </aside>
    </div>

  );

}

export default LandingPage;