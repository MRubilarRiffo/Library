const { Book } = require('../../db');

const getBook_FindByPk = async (id, props) => {
    try {
        const book = await Book.findByPk(id, props);
        
        if (!book || book.length === 0) return { error: 'Libro no encontrado' };

        return book;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getBook_FindByPk };