var fs = require('fs');
var models = require('./../models');

// Devuelve una lista de las imagenes disponibles y sus metadatos
exports.list = function (req, res, next) {
    models.Photo.findAll({ order: ['name'] }).then(function(photos) {
        res.render('photos/index', {photos: photos});
    }).catch(function(error) {
        next(error);
    });
};

// Devuelve la vista del formulario para subir una nueva foto
exports.new = function (req, res) {
    res.render('photos/new');
};

// Devuelve la vista de visualización de una foto.
// El campo photo.url contiene la url donde se encuentra el fichero de audio
exports.show = function (req, res, next) {
    console.log(req.params.photoId)
    models.Photo.findById(req.params.photoId).then(function(photo) {
        photo.id = req.params.photoId;
        res.render('photos/show', {photo: photo});
    }).catch(function(error) {
        next(error);
    });
};

// Escribe una nueva foto en el registro de imagenes.
exports.create = function (req, res) {
    var photo = models.Photo.build({ name: req.body.name, url: req.body.url });
    console.log('Nuevo fichero: ', req.body);
    return photo.save({ fields: [ 'name', 'url' ]}).then(function() {
        res.redirect('/photos');
    })
};

// Borra una foto (photoId) del registro de imagenes 
exports.destroy = function (req, res, next) {
    models.Photo.findById(req.params.photoId).then(function(photo) {
        photo.destroy().then(function() {
            res.redirect('/photos');
        });
    }).catch(function(error) {
        next(error);
    });  
};