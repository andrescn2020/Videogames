const { Videogame, Genre } = require("../db");

const createVideogame = async (req, res, next) => {

    const { name, description, released, rating, platforms, genre } = req.body;

    try {

        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            genre
        });

        await newGame.addGenre(genre);
        
        return res.status(201).json(newGame);  

    } catch (err) {

        next(err);

    }

}

const getVideogameById = async (req, res, next) => {

    try {

        const { id } = req.params;

        let videogamesDb = await Videogame.findOne({

            where: { id: id },
            include: Genre

        });

        return res.json(videogamesDb);

    } catch (err) {

        next(err);

    }

}

module.exports = {
    getVideogameById,
    createVideogame
}

// {
//     "name": "The zorr",
//     "description": "a very long game",
//     "released": "23-10-2015",
//     "rating": 5,
//     "platforms": ["XBOX", "Play Station 5"],
//     "genres": ["Action"]
// }