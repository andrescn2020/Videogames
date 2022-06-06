import React from 'react';
import { Link } from 'react-router-dom';
import "./Videogame.css";

const Videogame = (props) => {

  const { videogame } = props;

  const { id, name, image, genres, rating } = videogame;

  return (

    <div className="videogameContainer">

    <Link className='link' to = {`/api/videogame/${id}`}>

    <img className="videogameImage" src={image} alt={name} />

    <div className='videogameInfo'>
      
      <h1 className="videogameName">{name}</h1>

      <div className="videogameGenres">{genres.map((genre) => (

      <p key={genre.id}>{genre.name} </p>

      ))}

      </div>

      <p className='videogameRating'>Rating: {rating}</p>

    </div>

    </Link>

  </div>

  );
}

export default Videogame;