const { Gender } = require('../../db');

const getGender_FindByPk = async (id, props, limit, offset) => {
    try {
        const gender = await Gender.findByPk(id, props);

        const books = await gender.getBooks({
            limit,
            offset,
            attributes: ['id', 'title'],
            joinTableAttributes: []
        });

        if (!gender || gender.length == 0) {
            return { error: 'Género no encontrado' };
        };

        return { gender, books};
    } catch (error) {
        return { error: error.message };
    };
};

module.exports = { getGender_FindByPk };