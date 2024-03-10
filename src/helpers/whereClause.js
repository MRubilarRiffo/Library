const { Op } = require('sequelize');

const whereClause = (filters) => {
    const whereClause = {};

    if (filters.title) {
        let title = filters.title;

        title = title = '%' + title.toLowerCase() + '%';

        whereClause.title = {
            [Op.like]: title
        };
    };

    if (filters.name) {
        let name = filters.name;

        name = name = '%' + name.toLowerCase() + '%';

        whereClause.name = {
            [Op.like]: name
        };
    };

    if (filters.id) {
        let id = parseInt(filters.id);

        whereClause.id = id;
    };

    return whereClause;
};

module.exports = { whereClause };