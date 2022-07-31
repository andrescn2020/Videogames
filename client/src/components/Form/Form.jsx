import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGenres, getAllVideogames } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css"

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

  const [error, setError] = useState({

    name: "",
    description: "",
    platform: "",
    genre: ""

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

    if (input.name && input.description && input.platforms && input.genre && !error.name && !error.description && !error.platform && !error.genre) {

      setDisabled(false);

    } else {

      setDisabled(true);

    }

  }, [input.name, input.description, input.platforms, input.genre, error.name, error.description, error.platform, error.genre])

  function validate(input) {

    const errors = {};

    if (!input.name) {

      errors.name = 'Name is required';

    } else if (/[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF:]/g.test(input.name)) {

      errors.name = 'Name incorrect';

    } else if (input.name.length >= 30) {

      errors.name = 'Name of game is too long (Max 30 char.)';

    } else if (input.name.length <= 2) {

      errors.name = 'Name of game is too short (Min 3 char.)';

    } else if (input.name.charAt(0) === input.name.charAt(0).toLowerCase()) {

      errors.name = 'First letter must be Upper Case';

    }

    if (!input.description) {

      errors.description = 'Description is required';

    } else if(/[^\x20\x2D0-9A-Z\x5Fa-z\xC0-\xD6\xD8-\xF6\xF8-\xFF:"]/g.test(input.description)) {

      errors.description = "Special Characters is not allowed";

    } else if (input.description.length > 299) {

      errors.description = "Max 300 Characters";

    } else if (input.description.length < 10) {

      errors.description = "Min 10 Characters";

    }

    if (input.platforms.length === 0) {

      errors.platform = 'Platform is required';

    } else if(input.platforms.length === 6) {

      errors.platform = "Max 6 Platforms"

    }

    if (input.genre.length === 0) {

      errors.genre = 'Genre is required';

    } else if(input.genre.length > 5) {

      errors.genre = "Max 6 Genres"

    } else if(input.genre.length < 5 && input.genre.length > 0) {

      errors.genre = "";

    }

    return errors;

  }

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

      if (input.name && input.description && input.platforms && input.genre && !error.name && !error.description && !error.platform && !error.genre) {

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

        setError(validate(newState));

        return newState;

      });

    } else {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: e.target.value

        };

        setError(validate(newState));

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

        setError(validate(newState));

        return newState;

      });

    } else if (input.genre.includes(e.target.value)) {

      setInput((prevState) => {


        const newState = {

          ...prevState,
          [e.target.name]: [...input.genre]

        };

        setError(validate(newState));

        return newState;

      });


    }  else if (input.genre.length === 6) {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: [...input.genre]

        };

        setError(validate(newState));

        return newState;

      });
    
    } else {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: [...input.genre, e.target.value]

        };

        setError(validate(newState));

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

        setError(validate(newState));

        return newState;

      });

    } else if (input.platforms.includes(e.target.value)) {

      setInput((prevState) => {


        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms]

        };

        setError(validate(newState));

        return newState;

      });


    } else if (input.platforms.length === 6) {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms]

        };

        setError(validate(newState));

        return newState;

      });
    
    } else {

      setInput((prevState) => {

        const newState = {

          ...prevState,
          [e.target.name]: [...input.platforms, e.target.value]

        };

        setError(validate(newState));

        return newState;

      });

    }

  }

  ///////// DELETE SELECTED PLATFORM AND GENRES CASE /////////////////////////////////////////////////////

  if (deleteGenre) {

    if (input.genre.length === 0) {

      error.genre = "Genre is required";

    } else {

      input.genre = input.genre.filter((e) => e !== deleteGenre);

    }

    setDeleteGenre("");

  }

  if (deletePlatform) {

    if (input.platforms.length === 0) {

      error.platform = "Platform is required"

    } else {

      input.platforms = input.platforms.filter((e) => e !== deletePlatform);

    }

    setDeletePlatform("");

  }

  ////////// RENDER ////////////////////////////////////////////////////////////////////

  return (

    <div className='formFirstDiv'>

      <div className='formContainer'>

        <div className="homeButton">

          <Link to="/api/videogames/">

            <button>Home</button>

          </Link>

        </div>

        <form onSubmit={handleSubmit}>

          <div className='inputName'>

            <label>Videogame Name: </label>

            <input
              className='inputNameField'
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            /> <br></br> {error.name && <span className='errorText'>{error.name}</span>}

          </div>

          <div className='inputDescription'>

            <label>Description: </label>

            <textarea
              className='inputDescriptionField'
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
            /> <br></br> {error.description && <span className='errorText'>{error.description}</span>}

          </div>

          <div className='inputRelease'>

            <label>Released: </label>

            <input
              className='inputReleasedField'
              type="date"
              name="released"
              value={input.released}
              onChange={handleChange}
            />

          </div>

          <div className='inputRating'>

            <label>Rating: </label>

            <select name="rating" value={input.rating} onChange={handleChange}>

              <option value={0}>-</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>

            </select>

          </div>

          <div className='inputPlatforms'>

            <div className='columnPlatform'>

              <div className='infoDetail'>

                <label>Platform: </label>

                <select name="platforms" value={input.platforms[input.platforms.length - 1]} onChange={handleChangePlatform}>

                  <option value="Select">---------------</option>

                  {platformsAvaible.map((plat) => (

                    <option key={plat}>{plat}</option>

                  ))}

                </select>

                {error.platform && <span className='errorText'>{error.platform}</span>}

              </div>

              <br></br>

              <div className='platformsSelected'>

                {input.platforms.map((platform) => (

                  <button className='platformsButtons' onClick={(e) => setDeletePlatform(e.target.value)} key={platform} value={platform}>{platform}</button>

                ))}

              </div>

            </div>

          </div>

          <div className='inputGenres'>

            <div className='columnGenre'>

              <div className='infoDetail'>

                <label>Genres: </label>

                <select name="genre" value={input.genre[input.genre.length - 1]} onChange={handleChangeGenre}>

                  <option value="Select">---------------</option>

                  {genres.map((genre) => (

                    <option key={genre.id}>{genre.name}</option>

                  ))}

                </select>

                {error.genre && <span className='errorText'>{error.genre}</span>}

              </div>

              <br></br>

              <div className='genresSelected'>

                {input.genre.map((genr) => (

                  <button className='genreButtons' onClick={(e) => setDeleteGenre(e.target.value)} key={genr} value={genr}>{genr}</button>

                ))}

              </div>

            </div>

          </div>

          <div>

            <input className='inputImage' type="url" name="image" placeholder='Imagen URL...' onChange={handleChangeImage} />

          </div>

          <div className='inputSubmit'>

            <input className="createGame" type="submit" value="Create Videogame" disabled={disabled} />

          </div>

        </form>

      </div>

    </div>

  );

}

export default Form;