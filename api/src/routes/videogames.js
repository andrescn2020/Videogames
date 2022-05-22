const { Router } = require('express');
const { Videogame, Genre } = require("../db");
const router = Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get("/", async (req, res, next) => {

    try {

        const { name } = req.query;

        if(name){

            let videogamesDb = await Videogame.findAll({

                where: { name: { [Op.substring]: `%${name}` } },
                limit: 15

            })

            if(videogamesDb.length === 0) {

                res.json("Doesnt exist a game with this name")

            } else {

                return res.json(videogamesDb);

            }

        } else {

            let videogamesDb = await Videogame.findAll({
                include: Genre
            });

        return res.json(videogamesDb);
    
        }

    } catch (err) {

        next(err);

    }

});

module.exports = router;
