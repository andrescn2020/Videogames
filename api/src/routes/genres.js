const { Router } = require('express');
const { Genre, Videogame } = require("../db");
const router = Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get("/", async (req, res, next) => {

    try {

        let genresDb = await Genre.findAll({
            include: Videogame
        });

        res.json(genresDb);

    } catch (err) {

        next(err);

    }

});

module.exports = router;