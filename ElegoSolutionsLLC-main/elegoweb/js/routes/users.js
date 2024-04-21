const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// Obtener todos los usuarios
router.get("/users", (req, res) => {
  userSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener un usuario por su ID
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Crear un usuario
router.post("/user/:id/prefix", (req, res) => {
  const { id } = req.params;
  const { prefix_form } = req.body;
  
  console.log(prefix_form);

  const newUser = new userSchema({ prefix: prefix_form });

  newUser.save()
    .then((db) => {
      console.log(db);
      res.redirect(`/users/${id}`);
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: err });
    });
});

// Actualizar un usuario
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  
  userSchema.updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  
  userSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
