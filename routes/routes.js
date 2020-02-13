const express = require("express");
const app = express.Router();
const repository = require("../repositories/userRepository");

// get all User items in the db
app.get("/", (req, res) => {
  repository
    .findAll()
    .then(Users => {
      res.json(Users);
    })
    .catch(error => console.log(error));
});

// add a User item
app.post("/", (req, res) => {
  const { firstName, lastName, email, age } = req.body;
  repository
    .create(firstName, lastName, email, age)
    .then(User => {
      res.json(User);
    })
    .catch(error => console.log(error));
});

//delete a User item
app.post("/User/delete", (req, res) => {
  const id = req.body.id;
  console.log(`id = ${id}`);
  repository
    .deleteById(id)
    .then(ok => {
      res.json(User);
    })
    .catch(error => console.log(error));
});
module.exports = app;
