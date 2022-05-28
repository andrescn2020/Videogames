import React from 'react';
import "./Videogame.css";

const Videogame = (props) => {

  const { videogame } = props;

  const { name, image, genre, rating } = videogame;

  return (

    <div className="videogameContainer">
    <img className="videogameImage" src={image} alt={name} />
    <div className='videogameInfo'>
    <h1 className="videogameName">{name}</h1>

    <div className="videogameGenres">{genre.map((genr) => (

    <p key={genr}>{genr} </p>

    ))}
    </div>

    <p className='videogameRating'>{rating}</p>
    
    </div>

  </div>

  );
}

export default Videogame;