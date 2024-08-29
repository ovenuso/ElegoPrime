const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const morgan = require('morgan'); // Importa morgan
const multer = require('multer'); // Importa multer
const upload = multer(); // Configura multer para manejar solo los campos de texto
const { timeStamp, time } = require('console');
const userRoutes = require("./routes/users");

mongoose.set('debug', true);

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const ruta = '/ElegoSolutionsLLC-main/elegoweb/reserve-responsive.html';

// Middleware morgan para el registro de solicitudes
app.use(morgan('dev'));

// Middleware para analizar solicitudes con formato JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRoutes);

// Middleware CORS para permitir solicitudes desde 127.0.0.1:5500
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

//routes
app.use('/api', userRoutes);

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conexión a MongoDB Atlas establecida");
    })
    .catch((error) => {
        console.log("Error al conectar a MongoDB Atlas", error);
    });
;

// Definir el esquema de la colección
const documentoSchema = new mongoose.Schema({
    first_name: String,
    address: String,
    correo: String,
    number: String,
    servicios: Array,
    subservicios: Array,
    zip: String,
    bdate: Date,
    time: String,
    numbertime: Number,
    number2: Number
});
  
// Crear el modelo
const Documento = mongoose.model('Documento', documentoSchema);

//conexion frontend - Ruta para manejar la inserción de datos
app.post('/insertar', upload.none(), (req, res) => {
    console.log('Recibida solicitud POST en la ruta /insertar');
    console.log('Datos recibidos:', req.body); // Agregar este registro para verificar los datos recibidos

// Campos específicos
const { first_name, address, correo, number, servicios, subservicios, zip, bdate, time, numbertime, number2 } = req.body;

//Registros para demás campos "depurar"
console.log('Valor de first_name:', first_name);
console.log('Valor de address:', address);
console.log('Valor de correo:', correo);
console.log('Valor de number:', number);
console.log('Valor de servicios:', servicios);
console.log('Valor de subservicios:', subservicios);
console.log('Valor de zip:', zip);
console.log('Valor de bdate:', bdate);
console.log('Valor de time:', time);
console.log('Valor de numbertime:', numbertime);
console.log('Valor de correo:', number2);

// Crear un nuevo documento utilizando el modelo
const nuevoDocumento = new Documento({
    first_name,
    address,
    correo,
    number,
    servicios,
    subservicios,
    zip,
    bdate,
    time,
    numbertime,
    number2
});

// Guardar el documento en la base de datos
nuevoDocumento.save()
    .then(() => {
        console.log('Documento insertado correctamente');
        res.json({ message: 'Documento insertado correctamente' });
    })
    .catch((error) => {
        console.error('Error al insertar documento:', error);
        res.status(500).send('Error interno del servidor');
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Comentario de env
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
console.log('PORT:', process.env.PORT);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en:${PORT}`);
});