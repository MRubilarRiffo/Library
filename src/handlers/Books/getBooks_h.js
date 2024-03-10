const { Book } = require('../../db');

const getBooks_h = async (props) => {
    try {
        const books = await Book.findAll(props);

        if (!books || books.length === 0) return { error: 'Libros no encontrados' };

        return books;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getBooks_h };