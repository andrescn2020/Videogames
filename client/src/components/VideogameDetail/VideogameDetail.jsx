import React from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameById } from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./VideogameDetail.css";

const VideogameDetail = () => {

  const { id } = useParams();

  const { videogameDetail } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getVideogameById(id));

  }, [dispatch, id]);

  return (

    <div>

      <div className="infoContainer">

        {videogameDetail.length !== 0 ? (

          <>

            <img className='videogameImage' style={{ width: "99vw", height: "60vh", borderRadius: "0px", objectFit: "contain" }} src={videogameDetail.image} alt={videogameDetail.name} />

            <label>{videogameDetail.name}</label>

            <label>{videogameDetail.description}</label>

            <label>Released: {videogameDetail.released}</label>

            <label>Rating: {videogameDetail.rating}</label>

            <div className='platAndGenrContainer'>

              <div className='platContainer'>

                <label>Platforms: </label>

                {videogameDetail.platforms && videogameDetail.platforms.map((plat) => (

                  <span key={plat}>{plat} - </span>

                ))}

              </div>

              <div className='genrContainer'>

                <label>Genres: </label>

                {videogameDetail.genres && videogameDetail.genres.map((genre) => (

                  <span key={genre.id}>{genre.name} - </span>

                ))}

              </div>

            </div>

          </>

        ) : <span>no</span>}

      </div>

      <div className="homeButton">

        <Link to="/api/videogames/">

          <button>Home</button>

        </Link>

      </div>


    </div>

  );

}

export default VideogameDetail;