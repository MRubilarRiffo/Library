const { Gender, Book, Author } = require("../db");

const includedClause = (included, limit, offset) => {
    const allowedIncluded = {
        'gender': Gender,
        'book': Book,
        'author': Author
    };

    const selectedIncluded = included.split(',');

    const clause = selectedIncluded.map(item => {
        const table = allowedIncluded[item];
        if (table) {
            return {
                model: table,
                // attributes: ['id', 'title'],
                through: { 
                    attributes: ['id', 'title'] // Esto evita que se devuelvan las relaciones BookGender
                }
            }
        };
    }).filter(item => item);

    return clause;
};

module.exports = { includedClause };