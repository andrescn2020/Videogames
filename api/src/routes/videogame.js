const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require("../db");
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.post("/", async (req, res, next) => {

    try {

        const { name, description, realease, rating, platforms, genres } = req.body;

        const newGame = await Videogame.create(req.body);

        await newGame.addGenre(genres);
        
        return res.status(201).json(newGame);  

    } catch (err) {

        next(err);

    }

});

router.get("/:id", async (req, res, next) => {

    try {

        const { id } = req.params;

        let videogamesDb = await Videogame.findOne({

            where: { id: id },
            include: Genre

        });

        res.json(videogamesDb);

    } catch (err) {

        next(err);

    }

});

module.exports = router;