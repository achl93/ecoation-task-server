"use strict";

const express       = require('express');
const Routes        = express.Router();

module.exports = function(DataHelpers) {

  Routes.post("/register", (req, res) => {
    const userObj = {
      email: req.body.email,
      password: req.body.password,
      integer: req.body.integer
    };
    console.log(userObj);
    DataHelpers.saveNewUser(userObj);
    res.status(200).json({success: 'registered'});
  });

  Routes.post("/login", (req, res) => {
    const userObj = {
      email: req.body.email,
      password: req.body.password
    };
    console.log('LOGIN USEROBJ', userObj);
    DataHelpers.validateUser(userObj, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({error: err});
      } else if (result === 'success') {
        res.status(200).json({success: 'logged in'});
      }
    })
  });

  Routes.get("/:user/current", function(req, res) {
    // DataHelpers.addLike(req.body.uniqueId, (err) => {
    //   if (err) {
    //     res.status(400).json({error: err.message});
    //   } else {
    //     res.status(201).send();
    //   }
    // });
  });

  Routes.post("/:user/next", function(req, res) {
    // DataHelpers.removeLike(req.body.uniqueId, (err) => {
    //   if (err) {
    //     res.status(400).json({error: err.message});
    //   } else {
    //     res.status(201).send();
    //   }
    // });
  });

  Routes.post("/:user/modify", function(req, res) {
    // DataHelpers.getLikes(req.params.id, (err, likes) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     res.send(likes);
    //   }
    // })
  })

  return Routes;

}