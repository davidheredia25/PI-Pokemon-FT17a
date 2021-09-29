const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Pokemons, Types } = require('../db');



router.get('/', async (req, res, next) => {
    let pokeArray = [];
    let eachPoke = {}
    try {
        let dbPoke = await Pokemons.findAll({ include: [Types] });
        let apiPoke = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results;
        for (let i = 0; i < apiPoke.length; i++) {
            let pokeI = await axios.get(apiPoke[i].url)
            eachPoke = {
                id: pokeI.data.id,
                name: pokeI.data.name,
                hp: pokeI.data.stats[0].base_stat,
                attack: pokeI.data.stats[1].base_stat,
                defense: pokeI.data.stats[2].base_stat,
                speed: pokeI.data.stats[5].base_stat,
                height: pokeI.data.height,
                weight: pokeI.data.weight,
                img: pokeI.data.sprites.front_default,
                types: pokeI.data.types.map(type => type.type.name),
            }

            pokeArray.push(eachPoke);

        }

        return res.status(201).json([...pokeArray, ...dbPoke])
    } catch (error) {
        console.log(error);
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let pokemon;
        if (isNaN(id)) {
            pokemon = await Videogame.findByPk(id)
        }
        else {
            pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data.results

        }
        return res.json(pokemon)

    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let { name, hp, attack, defense, speed, height, weight, img, types } = req.body;

        let newPoke = await Pokemons.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        });

        await newPoke.addTypes(types)
        return res.status(200).json(newPoke)
    } catch (err) {
        next(err);
    }
});

module.exports = router;