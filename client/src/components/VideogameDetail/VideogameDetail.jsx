import React from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameById, cleanUp } from '../../redux/actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VideogameDetail = () => {

  const { id } = useParams();

  const { videogameDetail } = useSelector((state) => state);

  const dispatch = useDispatch();

  console.log(videogameDetail);

  // const { DB_APY_KEY } = process.env;

  useEffect(() => {

    dispatch(getVideogameById(id));

    return () => {

      dispatch(cleanUp());

    }

  }, [dispatch, id]);

  return (

    <div>

      <div className="homeButton">

        <Link to="/api/videogames/">

          <button>Home</button>

        </Link>

      </div>

      <div className="infoContainer">

        {videogameDetail.length !== 0 ? (

          <>

            <img className='videogameImage' src={videogameDetail.background_image} alt={videogameDetail.name} />

            <label>Name: {videogameDetail.name}</label>

            <label>Description: {videogameDetail.description}</label>

            <label>Released: {videogameDetail.released}</label>

            <label>Rating: {videogameDetail.rating}</label>

            <label>Platforms: </label>

            {videogameDetail.platforms && videogameDetail.platforms.map((plat) => (

              <span key={plat.platform.id}>{plat.platform.name}</span>

            ))}

          </>

        ) : <span>no</span>}

      </div>

    </div>

  );

}

export default VideogameDetail;