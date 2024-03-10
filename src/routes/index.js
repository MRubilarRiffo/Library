const { Router } = require('express');
const booksRoutes = require('./booksRoute');
const gendersRoutes = require('./gendersRoute');

const router = Router();

router.use('/books', booksRoutes);
router.use('/genders', gendersRoutes);

module.exports = router;