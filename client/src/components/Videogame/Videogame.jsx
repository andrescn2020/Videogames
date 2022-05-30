import React from 'react';
import { Link } from 'react-router-dom';
import "./Videogame.css";

const Videogame = (props) => {

  const { videogame } = props;

  const { id, name, background_image, genres, rating } = videogame;

  return (

    <div className="videogameContainer">

    <Link to = {`/api/videogame/${id}`}>

    <img className="videogameImage" src={background_image} alt={name} />
    <div className='videogameInfo'>
    <h1 className="videogameName">{name}</h1>

    <div className="videogameGenres">{genres.map((genre) => (

    <p key={genre.id}>{genre.name} </p>

    ))}
    </div>

    <p className='videogameRating'>{rating}</p>

    </div>

    </Link>

  </div>

  );
}

export default Videogame;