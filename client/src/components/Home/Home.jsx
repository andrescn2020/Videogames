import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGenres, getAllVideogames, sortByGenre, sortByAsc, sortByDesc, sortByMoreRating, sortByLessRating } from "../../redux/actions/actions";
import Videogame from "../Videogame/Videogame";
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {

  /////////// CONSTANTS ///////////////////////////////////////////

  const { videogames, genres } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);

  const [videogamesPerPage] = useState(15);

  const dispatch = useDispatch();

  /////////// USEEFFECT ///////////////////////////////////////////

  useEffect(() => {

    dispatch(getAllVideogames())
    dispatch(getAllGenres())

  }, [dispatch])

  /////////// VARIABLES ///////////////////////////////////////////

  let buttons = [];

  let currentVideogames = [];

  let indexOfFirstVideogame = 0;

  let indexOfLastVideogame = 0;

  /////////// FILTERS //////////////////////////////////////////////

  const handleSortByAsc = (e) => {

    if (e.target.value === "DESC") {

      dispatch(sortByDesc(videogames));

      return videogames;

    } else {

      dispatch(sortByAsc(videogames));

      return videogames;

    }

  }

  const handleSortByRat = (e) => {

    if (e.target.value === "MORE_RATING") {

      dispatch(sortByMoreRating(videogames));

      return videogames;

    } else {

      dispatch(sortByLessRating(videogames));

      return videogames;

    }

  }

  const handleSortByGenre = (e) => {

    dispatch(sortByGenre(e.target.value));

    return videogames;

  }

  /////////// PAGINATION ///////////////////////////////////////////

  for (let i = 1; i <= 15; i++) {

    buttons.push(i);

  }

  indexOfLastVideogame = currentPage * videogamesPerPage;

  indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /////////// RENDER /////////////////////////////////////////////

  return (

    <div>

      <select name="filter" onChange={handleSortByAsc}>

        <option value="SELECT">Alphanetic</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>

      </select>

      <select name="filter" onChange={handleSortByRat}>

        <option value="SELECT">Rating</option>
        <option value="MORE_RATING">MAX</option>
        <option value="LESS_RATING">MIN</option>

      </select>

      <select name="filter" onChange={handleSortByGenre}>

        {genres.map((genre) => (
          <option value={genre.name} key={genre.id}>{genre.name}</option>
        ))}

      </select>

      <div className="buttonsContainer">

        {buttons.map((number) => (
          <button className="buttons" onClick={() => paginate(number)} key={number}>{number}</button>
        ))}

      </div>

      <Link to = "/api/videogame/">
        <button>Create Videogame</button>
      </Link>

      <div className="videogamesContainer">

        {currentVideogames.length ? currentVideogames.map((videogame) => (

          <Videogame
            key={videogame.id}
            videogame={videogame}
          />

        )) : <div className="spinner"></div>}

      </div>


    </div>

  );

}

export default Home;