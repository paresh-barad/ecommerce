require('dotenv').config();
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  try {
    mongoose
      .connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() =>
        console.log(`MongoDB Connected!`)
      )
      .catch(err => console.log(err));
  } catch (error) {
    console.log("::::::::::::", error)
    return null;

  }
};

module.exports = setupDB;
