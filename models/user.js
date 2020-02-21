const mongoose = require("mongoose");
const { Schema } = mongoose;
const { pool } = require("../config/config");

const getUsers = (req, res) => {
  pool.query("SELECT * FROM book ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

//define schema for user items
const userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

//add a user
const createUser = (request, response) => {
  const { firstName, lastName, email, age } = request.body;
  pool.query(
    "INSERT INTO user (firstName, lastName,email, age) VALUES ($1, $2, to_date($3,'MM/DD/YYYY')) RETURNING *",
    [firstName, lastName, email, age],
    (error, results) => {
      if (error) {
        throw error;
      }
      //console.log(` ${results.rows[0].id}`);
      response
        .status(201)
        .send(`A new user added with ID: ${results.rows[0].id}`);
    }
  );
};

//database collection name
const collectionName = "collectionUsers";
const User = mongoose.model("MyUser", userSchema, collectionName); //User
module.exports = {
  getUsers,
  User,
  createUser
};
