const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Gender', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Unknown'
        },
    });
};