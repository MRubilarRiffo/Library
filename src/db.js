require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'mysql',
	logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

	modelDefiners.forEach(model => model(sequelize));

	let entries = Object.entries(sequelize.models);
	let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
	sequelize.models = Object.fromEntries(capsEntries);
	
	const { Book, Author, Gender } = sequelize.models;

	//Relaciones aquí
	Author.belongsToMany(Book, { through: 'AuthorBook' });
	Book.belongsToMany(Author, { through: 'AuthorBook' });

	Book.belongsToMany(Gender, { through: 'BookGender' });
	Gender.belongsToMany(Book, { through: 'BookGender' });

module.exports = {
	...sequelize.models,
	conn: sequelize,
};