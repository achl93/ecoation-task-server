"use strict";

const { ObjectID } = require("mongodb");

// Defines helper functions for using the database `db`
module.exports = function makeDataHelpers(db) {
  const users = db.collection('users');
  return {

    saveNewUser: function(newUser) {
      users.insertOne(newUser);
    },

    getInt: function(user, callback) {

    },

    incrementInt: function(user, callback) {

    },

    updateInt: function(user, callback) {

    },

    validateUser: function(user, callback) {
      users.find({email: user.email, password: user.password}).limit(1).each((err, res) => {
        if (res !== null && res !== undefined) {
          console.log('VALIDATEUSER RES', res);
          callback(null, 'success');
        }
        else if (err) {
          console.log('VALIDATEUSER ERR', err);
          callback(err, null);
        }
      })
    }
  };
}