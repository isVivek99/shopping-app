const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: 'user-data',
  }
);
const model = mongoose.model('UserData', User);

module.exports = model;
