"use strict";

const { ObjectID } = require("mongodb");

// Defines helper functions for using the database `db`
module.exports = function makeDataHelpers(db) {
  const users = db.collection('users');
  return {

    saveNewUser: function(newUser) {
      users.insertOne(newUser);
    },

    getInt: function(userEmail, callback) {
      users.find({email: userEmail}).limit(1).each((err, res) => {
        if (res !== null && res !== undefined) {
          console.log('GETINT RES', res);
          callback(null, res.integer);
        }
        else if (err) {
          console.log('GETINT ERR', err);
          callback(err, null);
        }
      })
    },

    incrementInt: function(userEmail, callback) {
      users.findOneAndUpdate({email: userEmail}, {$inc: {integer: 1}}, (err, res) => {
        if (err) {
          console.log('INCINT ERR', err);
          callback(err, null);
        } else {
          console.log('INCTINT RES', res);
          callback(null, res);
        }
      });
    },

    updateInt: function(updateObj, callback) {
      users.updateOne({email: updateObj.email}, {$set: {integer: Number(updateObj.newInt)}}, (err, res) => {
        if (err) {
          console.log('UPDATEINT ERR', err);
          callback(err, null);
        } else {
          console.log('UPDATEINT RES', res);
          callback(null, res);
        }
      })
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