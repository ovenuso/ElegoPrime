const mongoose = require("mongoose");
const Schema = mongoose.Schema

const documentoSchema = new mongoose.Schema({
    first_name: String,
    address: String,
    correo: String,
    number: String,
    servicios: Array,
    zip: String,
    bdate: Date,
    time: String,
    numbertime: Number,
    number2: Number
});

module.exports = mongoose.model('documentoSchema', documentoSchema);