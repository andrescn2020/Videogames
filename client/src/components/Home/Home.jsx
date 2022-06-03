import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGenres, getAllVideogames, sortByGenre, sortByAsc, sortByDesc, sortByMoreRating, sortByLessRating, resetFilter, sortByDb, searchBarTerm, cleanUpGames } from "../../redux/actions/actions";
import Videogame from "../Videogame/Videogame";
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {

  /////////// CONSTANTS ///////////////////////////////////////////

  const { videogames, genres } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(1);

  const [videogamesPerPage] = useState(15);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  /////////// USEEFFECT ///////////////////////////////////////////

  useEffect(() => {

    dispatch(getAllVideogames());
    dispatch(getAllGenres());

    // return () => {

    //   dispatch(cleanUpGames());

    // }

  }, [dispatch])

  /////////// VARIABLES ///////////////////////////////////////////

  let size = Math.ceil((videogames.length) / videogamesPerPage);

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

    if(e.target.value === "Genre"){

      return videogames;

    } else {

      dispatch(sortByGenre(e.target.value));

      setCurrentPage(1);
  
      return videogames;

    }

  }

  const handleFilter = () => {

    dispatch(resetFilter());

    setCurrentPage(1);

    return videogames;

  }

  const handleDatabaseAndApi = (e) => {

    if(e.target.value === "All") {

      dispatch(getAllVideogames());

      setCurrentPage(1);

      return videogames;

    } else {

      dispatch(sortByDb(e.target.value));

      setCurrentPage(1);

      return videogames;

    }

  }

  const handleSearchTerm = (e) => {

    setSearchTerm(e.target.value);

  }

  const handleSearchBar = (e) => {

    dispatch(searchBarTerm(searchTerm));

    setSearchTerm("");

    setCurrentPage(e.target = 1);

    return videogames;

  }

  /////////// PAGINATION ///////////////////////////////////////////

  for (let i = 1; i <= size; i++) {

    buttons.push(i);

  }

  if (currentPage === 0) {

    setCurrentPage(1);

  }

  if (size === 0) {

    size = 1;

  }

  if (currentPage > size) {

    let savePage = buttons.pop();

    setCurrentPage(savePage);

  }

  indexOfLastVideogame = currentPage * videogamesPerPage;

  indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /////////// RENDER /////////////////////////////////////////////

  return (

    <div>

      <input type="checkbox" />

      <select name="alphabeticOrder" onChange={handleSortByAsc}>

        <option value="SELECT">Alphabetic</option>
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>

      </select>

      <select name="orderRating" onChange={handleSortByRat}>

        <option value="SELECT">Rating</option>
        <option value="MORE_RATING">MAX</option>
        <option value="LESS_RATING">MIN</option>

      </select>

      <select name="genreFilter" onChange={handleSortByGenre}>

      <option>Genre</option>

        {genres.map((genre) => (

          <option value={genre.name} key={genre.name}>{genre.name}</option>

        ))}

      </select>

      <select name="dataFilter" onChange={handleDatabaseAndApi}>

          <option value="All">All</option>
          <option value="Games created in form">Games created in form</option>
          <option value="Games from api">Games from api</option>

      </select>

      <input name="searchInput" className="searchBar" value={searchTerm} type="text" placeholder="Search..." onChange={handleSearchTerm} />

      <input type="submit" value="Search" onClick={handleSearchBar} />

      <div className="buttonsContainer">

        <button onClick={() => setCurrentPage(currentPage - 1)}> Previous </button>

        {buttons.map((number) => (

          <button className="buttons" onClick={() => paginate(number)} key={number}>{number}</button>

        ))}

        <button onClick={() => setCurrentPage(currentPage + 1)}> Next </button>

      </div>

      <button onClick={handleFilter}>Clear Filter</button>

      <Link to="/api/videogame/">

        <button>Create Videogame</button>

      </Link>

      <div className="videogamesContainer">

        {currentVideogames.length !== 0 ? currentVideogames.map((videogame) => (

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