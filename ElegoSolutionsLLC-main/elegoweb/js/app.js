const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5500;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Usar variable de entorno para el usuario de correo
    pass: process.env.EMAIL_PASS  // Usar variable de entorno para la contraseña del correo
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Usar variable de entorno para el remitente
    to: 'elegoprime@gmail.com',
    subject: `Mensaje de ${name} (${email})`,
    text: message
  };

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

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
