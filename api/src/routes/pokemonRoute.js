const express = require('express');
const axios = require('axios');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Pokemons, Types } = require('../db');


router.get('/', async (req, res, next) => {
    const pokeArray = [];
    try {
        const dbPoke = await Pokemons.findAll({ include: [Types] });
        const apiPoke = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results;
        for (let i = 0; i < apiPoke.length; i++) {
            const pokeI = await axios.get(apiPoke[i].url)
            const pokemon = {
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
            pokeArray.push(pokemon);
        }
        return res.status(201).json([...pokeArray, ...dbPoke])
    } catch (error) {
        next(error);
    }
});

router.get('/one', async (req, res, next) => {
    const { id } = req.query;
    try {
        if (id.length > 10) {
            const dbPoke = await Pokemons.findByPk(id, { include: [Types] })
            return res.status(200).json(dbPoke)
        } else {
            const idPoke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
            const pokemon = {
                id: idPoke.id,
                name: idPoke.name,
                hp: idPoke.stats[0].base_stat,
                attack: idPoke.stats[1].base_stat,
                defense: idPoke.stats[2].base_stat,
                speed: idPoke.stats[5].base_stat,
                height: idPoke.height,
                weight: idPoke.weight,
                img: idPoke.sprites.front_default,
                types: idPoke.types.map(type => type.type.name)
            };
            return res.status(200).json(pokemon)
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;
        const newPoke = await Pokemons.create({
            id: uuidv4(),
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
        console.log(newPoke)
        return res.status(200).json(newPoke)
    } catch (err) {
        next(err);
    }
});

module.exports = router;