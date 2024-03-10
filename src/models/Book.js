const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Unknown'
        },
        pubdate: {
            type: DataTypes.DATE
        },
        category: {
            type: DataTypes.STRING
        },
        language: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        author: {
            type: DataTypes.STRING
        },
    });
};