const { User } = require("../models/user");

class userRepository {
  constructor(model) {
    this.model = model;
  }

  findAll() {
    return this.model.find();
  }
  //find user by id
  findById(id) {
    return this.model.findById(id);
  }

  //create a new User
  create(firstName, lastName, email, age) {
    const newUser = { firstName, lastName, email, age };
    const User = new this.model(newUser);
    return User.save();
  }

  // delete User
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update User
  updateById;
}

module.exports = new userRepository(User);
