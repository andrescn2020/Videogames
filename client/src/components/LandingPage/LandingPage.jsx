import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {

  return (

    <div>

      <h1 className='welcome'>Welcome to the Videogames PI!</h1>

      <aside className='exploreContainer'>

        <Link style={{ "textDecoration": "none" }} to="api/videogames/">

          <button className='exploreLink'>Explore Videogames!</button>

        </Link>

      </aside>

    </div>

  );

}

export default LandingPage;