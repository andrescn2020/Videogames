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
    genres: []

  });

  const [disabled, setDisabled] = useState(true);

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

  videogames.map((videogame) => videogame.platforms.map((platform) => allPlatforms.add(platform.platform.name)));

  for (const key of allPlatforms) {

    platformsAvaible.push(key);

  }

  ////////// HANDLE_SUBMIT ////////////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (input.name && input.platforms && input.genres) {

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
          genres: []

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
              [e.target.name]: [...input.genres]
          };

          return newState;

      });

  } else if (input.genres.includes(e.target.value)) {

      setInput((prevState) => {


          const newState = {
              ...prevState,
              [e.target.name]: [...input.genres]
          };

          return newState;

      });


  } else {

      setInput((prevState) => {

          const newState = {
              ...prevState,
              [e.target.name]: [...input.genres, e.target.value]
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


  // const handleChangePlatform = (e) => {

  //   if (e.target.value === "Select" || e.target.name === []) {

  //     setInput((prevState) => {


  //         const newState = {

  //             ...prevState,
  //             [e.target.name]: [...input.platforms]

  //         };

  //         return newState;

  //     });

  // } else if (input.platforms.includes(e.target.value)) {

  //     setInput((prevState) => {


  //         const newState = {

  //             ...prevState,
  //             [e.target.name]: [...input.platforms]

  //         };

  //         return newState;

  //     });


  // } else {

  //     setInput((prevState) => {

  //         const newState = {

  //             ...prevState,
  //             [e.target.name]: [...input.platforms, e.target.value]

  //         };

  //         return newState;

  //     });

  //   }

  // }

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

          {/* <select name="platforms" value={``} onChange={handleChangePlatform}>

            <option value="Select">---------------</option>

            {platformsAvaible.map((platform, i) => (

              <option key={platform} value={platform}>{platform}</option>

            ))}

          </select> */}

        </div>

        <div className='inputGenres'>

          <label>Genres: </label>

          <select name="genres" value={``} onChange={handleChangeGenre}>

            <option value="Select">---------------</option>

            {genres.map((genre) => (

              <option key={genre.id} value={genre.id}>{genre.name}</option>

            ))}

          </select>

        </div>

        <div>

              <input type="file" name="background_image" onChange={handleChangeImage}/>Choose Image

        </div>

        <div className='inputSubmit'>

          <input className="createActivity" type="submit" disabled={disabled} value="Create Videogame" />

        </div>

      </form>

    </div>

  );

}

export default Form;