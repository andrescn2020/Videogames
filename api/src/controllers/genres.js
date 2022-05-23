const { Genre, Videogame } = require("../db");

const getGenres = async (req, res, next) => {

    try {

        let genresDb = await Genre.findAll({
            include: Videogame
        });

        return res.json(genresDb);

    } catch (err) {

        next(err);

    }

}

module.exports = getGenres;