import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGenres, getAllVideogames } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {

  ////////// STATES ////////////////////////////////////////////////////////////////////

  const { genres, videogames } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [input, setInput] = useState({

    name: "",
    description: "",
    released: "",
    rating: 0,
    background_image: "",
    platforms: [],
    genre: []

  });

  const [disabled, setDisabled] = useState(true);

  const [deleteGenre, setDeleteGenre] = useState("");

  const [deletePlatform, setDeletePlatform] = useState("");

  ////////// USE_EFFECT ////////////////////////////////////////////////////////////////////

  useEffect(() => {

    dispatch(getAllGenres());
    dispatch(getAllVideogames());

  }, [dispatch]);


  useEffect(() => {

    if (input.name && input.description && input.platforms) {

      setDisabled(false);

    } else {

      setDisabled(true);

    }

  }, [input.name, input.description, input.platforms])

  ////////// VARIABLES ////////////////////////////////////////////////////////////////////

  let allPlatforms = new Set();

  let platformsAvaible = [];

  videogames.map((videogame) => videogame.platforms.map((platform) => allPlatforms.add(platform)));

  for (const key of allPlatforms) {

    platformsAvaible.push(key);

  }

  ////////// HANDLE_SUBMIT ////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (input.name && input.platforms && input.genre) {

        input.rating = parseInt(input.rating);

        await axios.post("http://localhost:3001/api/videogame/", input);

        alert('Videogame created successfully');

        setInput({

          name: "",
          description: "",
          released: "",
          rating: 0,
          background_image: "",
          platforms: [],
          genre: []

        });

      }

    } catch (err) {

      console.log(err);;

    }

  }

  ////////// HANDLE_CHANGE ////////////////////////////////////////////////////////////////////

  const handleChange = (e) => {

    if (e.target.value === "Select") {

      setInput((prevState) => {


        const newState = {

          ...prevState,
          [e.target.name]: ""

        };

        return newState;

      });

    } else {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: e.target.value

        };

        return newState;

      });

    }

  }

  ////////// HANDLE_CHANGE_GENRE ////////////////////////////////////////////////////////////////////

  const handleChangeGenre = (e) => {

    if (e.target.value === "Select" || e.target.name === []) {

      setInput((prevState) => {


        const newState = {
          ...prevState,
          [e.target.name]: [...input.genre]
        };

        return newState;

      });

    } else if (input.genre.includes(e.target.value)) {

      setInput((prevState) => {


        const newState = {
          ...prevState,
          [e.target.name]: [...input.genre]
        };

        return newState;

      });


    } else {

      setInput((prevState) => {

        const newState = {
          ...prevState,
          [e.target.name]: [...input.genre, e.target.value]
        };

        return newState;

      });

    }

  }

  ///////// HANDLE_CHANGE_PLATFORM ////////////////////////////////////////////////////////////////////

  const handleChangeImage = (e) => {

    setInput((prevState) => {

      const newState = {

        ...prevState,
        [e.target.name]: e.target.value

      };

      return newState;

    });

  }

  const handleChangePlatform = (e) => {

    if (e.target.value === "Select" || e.target.name === []) {

      setInput((prevState) => {


        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms]

        };

        return newState;

      });

    } else if (input.platforms.includes(e.target.value)) {

      setInput((prevState) => {


        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms]

        };

        return newState;

      });


    } else {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms, e.target.value]

        };

        return newState;

      });

    }

  }

///////// DELETE SELECTED PLATFORM AND GENRES CASE /////////////////////////////////////////////////////

  if (deleteGenre) {

    if (input.genre.length === 0) {

      //error.country = "Country is required"

    } else {

      input.genre = input.genre.filter((e) => e !== deleteGenre);

    }

    setDeleteGenre("");

  }

  if (deletePlatform) {

    if (input.platforms.length === 0) {

      //error.country = "Country is required"

    } else {

      input.platforms = input.platforms.filter((e) => e !== deletePlatform);

    }

    setDeletePlatform("");

  }

  ////////// RENDER ////////////////////////////////////////////////////////////////////

  return (

    <div>

      <div className="homeButton">

        <Link to="/api/videogames/">

          <button>Home</button>

        </Link>

      </div>

      <form onSubmit={handleSubmit}>

        <div className='inputName'>

          <label>Videogame Name: </label>

          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />

        </div>

        <div className='inputDescription'>

          <label>Description: </label>

          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
          />

        </div>

        <div className='inputRelease'>

          <label>Released: </label>

          <input
            type="date"
            name="released"
            value={input.released}
            onChange={handleChange}
          />

        </div>

        <div className='inputRating'>

          <label>Rating: </label>

          <select name="rating" value={input.rating} onChange={handleChange}>

            <option value="Unspecified" >-</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>

          </select>

        </div>

        <div className='inputPlatforms'>

          <label>Platforms: </label>

          <select name="platforms" value={``} onChange={handleChangePlatform}>

            <option value="Select">---------------</option>

            {platformsAvaible.map((platform) => (

              <option key={platform} value={platform}>{platform}</option>

            ))}

          </select>

          <div className='platformsSelected'>

            {input.platforms.map((platform) => (

              <button onClick={(e) => setDeletePlatform(e.target.value)} value={platform} key={platform}>{platform}</button>

            ))}

          </div>

        </div>

        <div className='inputGenres'>

          <label>Genres: </label>

          <select name="genre" value={``} onChange={handleChangeGenre}>

            <option value="Select">---------------</option>

            {genres.map((genre) => (

              <option key={genre.id}>{genre.name}</option>

            ))}

          </select>

          <div className='genresSelected'>

            {input.genre.map((genr) => (

              <button onClick={(e) => setDeleteGenre(e.target.value)} key={genr} value={genr}>{genr}</button>

            ))}

          </div>

        </div>

        <div>

          <input type="file" name="image" onChange={handleChangeImage} />Choose Image

        </div>

        <div className='inputSubmit'>

          <input className="createActivity" type="submit" disabled={disabled} value="Create Videogame" />

        </div>

      </form>

    </div>

  );

}

export default Form;