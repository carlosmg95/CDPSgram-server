var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

//  Usar BBDD SQLite:
//      DATABASE_URL: sqlite:///
//      DATABASE_STORAGE: cdps.sqlite
//  Usar BBDD Postgres:
//      DATABASE_URL: postgres://user:passwd@host:port/database

var url, storage;

if(!process.env.DATABASE_URL) {
    url = "sqlite:///"
    storage = "cdps.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || '';
}

var sequelize = new Sequelize(url, {storage: storage, omitNull: true});

/* Importar la definicion de las tablas */
var Photo = sequelize.import(path.join(__dirname, 'photo'));
var User = sequelize.import(path.join(__dirname, 'user'));

/* Relación users y photos */
User.hasMany(Photo, { foreignKey: 'AuthorId' });
Photo.belongsTo(User, { as: 'Author', foreignKey: 'AuthorId' });

/* Exportar definición de tablas */
exports.Photo = Photo;		// Exportar la tabla Photo
exports.User = User;		// Exportar la tabla User