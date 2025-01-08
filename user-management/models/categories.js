const mongoose = require('mongoose')

const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
        }
    }, {
    timestamps: true
});

const Categorie = mongoose.model('Categorie', categorieSchema)


module.exports = Categorie