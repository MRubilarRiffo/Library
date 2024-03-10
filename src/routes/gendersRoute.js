const gendersRoute = require('express').Router();

const { getGenders } = require('../controllers/Gender/getGenders');
const { getGender_ById } = require('../controllers/Gender/getGender_ById');

gendersRoute.get('/', getGenders);
gendersRoute.get('/:id', getGender_ById);

module.exports = gendersRoute;