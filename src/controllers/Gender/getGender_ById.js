const { attributesClause } = require("../../helpers/attributesClause");
const { includedClause } = require("../../helpers/includedClause");
const { getGender_FindByPk } = require("../../handlers/Gender/getGender_FindByPk");

const getGender_ById = async (req, res) => {
    try {
        const limit = 10;
        const currentPage = req.query.page > 0 ? req.query.page : 1;
        const offset = (currentPage - 1) * limit;

        const id = req.params.id;

        if (!id) {
            return res.status(400).send('Falta el id');
        };

        const attributes = req.query.fields ? attributesClause(req.query.fields, 'gender') : null;

        const props = { attributes };

        const { gender, books } = await getGender_FindByPk(id, props, limit, offset);

        if (gender.error) {
            return res.status(400).send(gender.error);
        } else {
            return res.json({ gender, books });
        };
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener género' });
    };
};

module.exports = { getGender_ById };