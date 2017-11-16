"use strict";

const express       = require('express');
const Routes        = express.Router();

module.exports = function(DataHelpers) {

  Routes.post("/register", (req, res) => {
    const userObj = {
      email: req.body.email,
      password: req.body.password,
      integer: Number(req.body.integer)
    };
    // console.log(userObj);
    DataHelpers.saveNewUser(userObj);
    res.status(200).json({success: 'registered'});
  });

  Routes.post("/login", (req, res) => {
    const userObj = {
      email: req.body.email,
      password: req.body.password
    };
    // console.log('LOGIN USEROBJ', userObj);
    DataHelpers.validateUser(userObj, (err, result) => {
      // console.log(result);
      if (err) {
        res.status(500).json({error: err});
      } else if (result === 'success') {
        res.status(200).json({success: 'logged in'});
      }
    })
  });

  Routes.get("/:user/current", function(req, res) {
    // console.log('REQ PARAMS', req.params);
    DataHelpers.getInt(req.params.user, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
      } else {
        res.status(200).json({integer: result});
      }
    })
  });

  Routes.get("/:user/next", function(req, res) {
    DataHelpers.incrementInt(req.params.user, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
      } else {
        DataHelpers.getInt(req.params.user, (newErr, newResult) => {
          if (err) {
            res.status(500).json({error: newErr});
          } else {
            res.status(200).json({integer: newResult});
          }
        })
      }
    })
  });

  Routes.post("/:user/modify", function(req, res) {
    // console.log(req.body);
    const updateObj = {
      email: req.body.email,
      newInt: req.body.newInt
    };
    DataHelpers.updateInt(updateObj, (err, result) => {
      if (err) {
        res.status(500).json({error: err});
      } else {
        DataHelpers.getInt(updateObj.email, (newErr, newResult) => {
          if (err) {
            res.status(500).json({error: newErr});
          } else {
            res.status(200).json({integer: newResult});
          }
        })
      }
    })
  });

  return Routes;

}