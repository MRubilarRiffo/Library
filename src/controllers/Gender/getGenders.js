const { getGenders_FindAll } = require('../../handlers/Gender/getGenders_FindAll');
const { attributesClause } = require('../../helpers/attributesClause');
const { whereClause } = require('../../helpers/whereClause');

const getGenders = async (req, res) => {
    try {
        const limit = 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;

        const filters = {
            name: req.query.name,
            id: req.query.id,
        };

        const where = whereClause(filters);

        const sortOrder = req.query.sortOrder || 'asc';
        let order = [
            [ 'name' , sortOrder === 'desc' ? 'DESC' : 'ASC' ],
        ];

        const attributes = req.query.fields ? attributesClause(req.query.fields, 'gender') : null;
        
        const props = { where, order, limit, offset, attributes };

        const { count, rows, error } = await getGenders_FindAll(props);

        if (error) {
            return res.status(400).send(error);
        } else {
            const totalPages = Math.ceil(count / limit);

            const response = {
                metadata: {
                    totalGenders: count,
                    totalPages: totalPages,
                    currentPage: currentPage
                },
                data: rows
            };

            return res.json(response);
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los libros' });
    };
};

module.exports = { getGenders };