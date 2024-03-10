const { Gender } = require('../../db');

const getGenders_FindAll = async (props) => {
    try {
        console.log("aqui");
        const genders = await Gender.findAndCountAll(props);
        if (!genders || genders.length == 0) {
            return { error: 'Géneros no encontrados' };
        };
        console.log(genders);

        return genders;
    } catch (error) {
        return error.message;
    };
};

module.exports = { getGenders_FindAll };