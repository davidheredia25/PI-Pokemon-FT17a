const { Router } = require('express');
const pokemonRoute = require('./pokemonRoute');
const typeRoute = require('./typeRoute');

const router = Router();

router.use('/pokemons', pokemonRoute);
router.use('/types', typeRoute);



module.exports = router;
