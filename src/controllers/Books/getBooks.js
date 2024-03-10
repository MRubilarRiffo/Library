const { getBooks_h } = require("../../handlers/Books/getBooks_h");
const { getTotalBooks } = require("../../handlers/Books/getTotalBooks");
const { attributesClause } = require("../../helpers/attributesClause");
const { includedClause } = require("../../helpers/includedClause");
const { oneDrive } = require("../../helpers/oneDrive");
const { whereClause } = require("../../helpers/whereClause");

const getBooks = async (req, res) => {
    try {
        const limit = 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;

        const filters = {
            title: req.query.title,
            id: req.query.id,
        };
        const where = whereClause(filters);

        const sortOrder = req.query.sortOrder || 'asc';
        let order = [
            [ 'title' , sortOrder === 'desc' ? 'DESC' : 'ASC' ]
        ];

        const attributes = req.query.fields ? attributesClause(req.query.fields, 'book') : {};

        const include = req.query.included ? includedClause(req.query.included) : [];

        const props = { where, order, limit, offset, attributes, include };

        const books = await getBooks_h(props);

        if (books.error) {
            res.status(400).send(books.error);
        } else {
            const totalBooks = await getTotalBooks(filters);

            const totalPages = Math.ceil(totalBooks / limit);

            const response = {
                metadata: {
                    totalBooks: totalBooks,
                    totalPages: totalPages,
                    currentPage: currentPage
                },
                data: books
            };

            res.json(response);
        };
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    };
};

module.exports = { getBooks };