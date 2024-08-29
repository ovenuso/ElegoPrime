const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5500;

const urlCompleta = `http://127.0.0.1:5500/ElegoSolutionsLLC-main/elegoweb/contact-responsive.html`;
console.log("Url completa", urlCompleta);

// Configurar nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Proveedor de correo electrónico
  auth: {
    user: 'elegoprime@gmail.com', // Dirección de correo electrónico
    pass: 'tupassword' // Contraseña de correo electrónico
  }
});

// Middleware para analizar las solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta POST para manejar el envío del formulario
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Configurar el correo electrónico
  const mailOptions = {
    from: 'tucorreo@gmail.com', // Dirección de correo electrónico
    to: 'elegoprimeo@gmail.com', // Dirección a la que se envia el correo
    subject: `Mensaje de ${name} (${email})`,
    text: message
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.status(200).send('Correo electrónico enviado correctamente');
    }
  });
});

// Iniciar el servidor
app.listen(PORT, '127.0.0.1', () => console.log('server listening on port', urlCompleta));
