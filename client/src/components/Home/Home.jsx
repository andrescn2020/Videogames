import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGenres, getAllVideogames, sortByGenre, sortByAsc, sortByDesc, sortByMoreRating, sortByLessRating, resetFilter, sortByDb } from "../../redux/actions/actions";
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

    dispatch(getAllVideogames());
    dispatch(getAllGenres());

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

    dispatch(sortByGenre(e.target.value));

    setCurrentPage(1);

    return videogames;

  }

  const handleFilter = () => {

    dispatch(resetFilter());

    setCurrentPage(1);

    return videogames;

  }

  const handleDatabase = () => {

    dispatch(sortByDb());

    setCurrentPage(1);

    return videogames;

  }

  /////////// PAGINATION ///////////////////////////////////////////



  for (let i = 1; i <= size; i++) {

    buttons.push(i);

  }

    if(currentPage === 0){

      setCurrentPage(1);

    }  

    if(size === 0) {

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

      <select name="filter" onChange={handleSortByAsc}>

        <option value="SELECT">Alphabetic</option>
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

          <option value={genre.name} key={genre.name}>{genre.name}</option>

        ))}

      </select>

      <button onClick={handleFilter}>Clear Filter</button>

      <button onClick={handleDatabase}>Videogames created by form</button>

      <div className="buttonsContainer">

        <button onClick={() => setCurrentPage(currentPage - 1)}> Previous </button>

        {buttons.map((number) => (

          <button className="buttons" onClick={() => paginate(number)} key={number}>{number}</button>
        
        ))}

        <button onClick={() => setCurrentPage(currentPage + 1)}> Next </button>

      </div>

      <Link to = "/api/videogame/">
        
        <button>Create Videogame</button>

      </Link>

      <div className="videogamesContainer">

        {currentVideogames && currentVideogames.map((videogame) => (

          <Videogame
            key={videogame.id}
            videogame={videogame}
          />

        ))}

      </div>


    </div>

  );

}

export default Home;