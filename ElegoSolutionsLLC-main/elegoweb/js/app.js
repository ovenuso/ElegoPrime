require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
const port = 5500;

const urlCompleta = `http://127.0.0.1:5500/ElegoSolutionsLLC-main/elegoweb/contact-responsive.html`;
console.log("Url completa", urlCompleta);

// Middleware CORS para permitir solicitudes desde 127.0.0.1:5500
app.use(cors({
    origin: 'http://127.0.0.1:5500/ElegoSolutionsLLC-main/elegoweb/contact-responsive.html'
  }));

// Configuración de body-parser para analizar las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
    // Extraer los datos del formulario
    const { name, email, message } = req.body;

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Accede a la variable de entorno EMAIL_USER
            pass: process.env.EMAIL_PASS // Accede a la variable de entorno EMAIL_PASS
        }
    });

    // Configurar el correo electrónico
    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: 'elegosolutionsllc@gmail.com', // Cambia esto por la dirección de correo del destinatario
        subject: 'Mensaje desde el formulario de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.send('Correo electrónico enviado con éxito');
        }
    });
});


app.listen(port, '127.0.0.1', () => console.log('server listening on port', urlCompleta));
