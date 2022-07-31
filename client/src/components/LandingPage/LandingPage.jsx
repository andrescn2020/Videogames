import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {

  return (

    <div className='landingPageContainer'>

      <h1 className='welcome'>Welcome to the Videogames PI!</h1>

      <aside className='exploreContainer'>

        <Link style={{ "textDecoration": "none" }} to="api/videogames/">

          <button className='exploreLink'> Start </button>

        </Link>

      </aside>

    </div>

  );

}

export default LandingPage;