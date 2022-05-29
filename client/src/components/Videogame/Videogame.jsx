import React from 'react';
import "./Videogame.css";

const Videogame = (props) => {

  const { videogame } = props;

  const { name, image, genres, rating } = videogame;

  return (

    <div className="videogameContainer">
    <img className="videogameImage" src={image} alt={name} />
    <div className='videogameInfo'>
    <h1 className="videogameName">{name}</h1>

    <div className="videogameGenres">{genres.map((genre) => (

    <p key={genre.id}>{genre.name} </p>

    ))}
    </div>

    <p className='videogameRating'>{rating}</p>
    
    </div>

  </div>

  );
}

export default Videogame;