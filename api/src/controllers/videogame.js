const { Videogame, Genre } = require("../db");

const createVideogame = async (req, res, next) => {

    const { name, description, realease, rating, platforms, genres } = req.body;

    try {

        const newGame = await Videogame.create(req.body);

        await newGame.addGenre(genres);
        
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