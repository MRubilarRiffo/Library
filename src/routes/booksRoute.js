const booksRoutes = require('express').Router();

const { getBooks } = require('../controllers/Books/getBooks');
const { getBookById } = require('../controllers/Books/getBookById');

booksRoutes.get('/', getBooks);
booksRoutes.get('/:id', getBookById);

module.exports = booksRoutes;