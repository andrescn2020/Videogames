import React from 'react';
import { Link } from 'react-router-dom';
import "./Videogame.css";

const Videogame = (props) => {

  const { videogame } = props;

  const { id, name, image, genre, rating } = videogame;

  return (

    <div className="videogameContainer">

    <Link to = {`/api/videogame/${id}`}>

    <img className="videogameImage" src={image} alt={name} />
    <div className='videogameInfo'>
    <h1 className="videogameName">{name}</h1>

    <div className="videogameGenres">{genre.map((genre) => (

    <p key={genre}>{genre} </p>

    ))}
    </div>

    <p className='videogameRating'>{rating}</p>

    </div>

    </Link>

  </div>

  );
}

export default Videogame;