const { Book } = require('../../db');
const { whereClause } = require('../../helpers/whereClause');

const getTotalBooks = async (filters) => {
    try {
        const where = whereClause(filters);

        const totalBooks = await Book.count({ where });

        return totalBooks;
    } catch (error) {
        return error;
    };
};

module.exports = { getTotalBooks };