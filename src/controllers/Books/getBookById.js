const { oneDrive } = require("../../helpers/oneDrive");
const { includedClause } = require("../../helpers/includedClause");
const { getBook_FindByPk } = require("../../handlers/Books/getBook_FindByPk");

const getBookById = async (req, res) => {
    try {
        const id = req.params.id
        const activeOneDrive = req.query.onedrive || false;

        if (!id) {
            return res.status(400).send('Falta el id');
        };

        const allowedFields = ['id', 'title', 'pubdate', 'category', 'language', 'description', 'author', 'createdAt', 'updatedAt'];
        const selectedFields = req.query.fields ? req.query.fields.split(',') : null;
        const attributes = selectedFields && selectedFields.filter(field => allowedFields.includes(field));

        const include = req.query.included ? includedClause(req.query.included) : [];

        const props = { attributes, include };

        const book = await getBook_FindByPk(id, props);

        if (activeOneDrive && book.Authors && book.id && book.title) {
            var urls = await oneDrive(book.title, book.Authors.map(author => (author.name)), book.id);
        };

        if (book.error) {
            return res.status(400).send(book.error);
        } else {
            return res.json({ book: book, urls });
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el libro' });
    };
};

module.exports = { getBookById };