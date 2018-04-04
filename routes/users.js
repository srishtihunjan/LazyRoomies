var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var user = schema.User;
var apartment = schema.Apartment;

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET ALL users in the system */
router.get('/', function (req, res, next) {
  user.find(function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Server error fetching user details');
    }
    console.log('=> User Info queried: ' + response);
    if (response && response != '') {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  });
});

/* GET details of 1 user by UserId */
router.get('/:userId', function (req, res, next) {
  user.findById(req.params.userId, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error fetching users');
    }
    console.log('=> Users queried!');
    res.status(200);
    res.send(response);
  });
});

/* Login Page: GET details of 1 user by email */
router.get('/login/:emailId/:password', function (req, res, next) {
  user.find({ email: req.params.emailId, password: req.params.password }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Server error fetching user details');
    }
    console.log('=> User Info queried! ');
    if (response && response != '') {
      res.status(200);
      res.send(response);
    } else {
      res.status(401);
      res.send('User Authentication Failed!');
    }
  });
});

/* GET ALL users in Apartment */
router.get('/all/:aptName', function (req, res, next) {
  user.find({ apartmentName: req.params.aptName }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Server error fetching user details');
    }
    console.log('=> User Info queried: ' + response);
    if (response && response != '') {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  });
});

/* POST details of 1 user. AptId OPTIONAL */
router.post('/', function (req, res, next) {
  var userObj = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };
  if (req.body.apartmentName) {
    userObj.apartmentName = req.body.apartmentName;
  }

  if (req.body.apartmentName) {
    apartment.findOne({ name: req.body.apartmentName }, function (err, response) {
      if (err) {
        console.log('=> Error finding apartment name: ' + err);
        res.status(500).send('Error finding apartment name');
      }
      if (response && response != '') {
        user.create(userObj, function (err1, user_response) {
          if (err1) {
            console.log('EMAIL EXISTS err.errmsg = > ' + JSON.stringify(err1.errmg));
            console.log('=> Error creating user: ' + err1);
            res.status(500).send('Error inserting users');
          }
          console.log('=> User created! ' + user_response);
          res.sendStatus(201);
        });
      } else {
        console.log('=> Invalid Apartment Name. User creation FAILED!');
        res.status(400);
        res.send('Invalid Apartment Name. User creation FAILED!');
      }
    });
  } else {
    user.create(userObj, function (err, response) {
      if (err) {
        var duplicateKeyErr = JSON.stringify(err.errmsg);
        if (duplicateKeyErr.includes('duplicate key error collection')) {
          console.log('***********************DUPLICATE KEY****************************');
          res.status(401).send('Email already exists');
        }
        console.log('=> Error creating user: ' + err);
        res.status(500).send('Internal_Server_Err: ' + err);
      }
      console.log('=> User created!' + response);
      res.status(201);
      res.send(response);
    });
  }
});

/* POST: UPDATE User with Apt Id */
router.post('/joinapt', function (req, res, next) {
  apartment.findOne({ name: req.body.apartmentName }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error finding Apartment');
    }
    if (response != null && response != '') {
      console.log('=> Apt created with ID = ' + response._id);
      user.findByIdAndUpdate(req.body.userId, { apartmentName: req.body.apartmentName }, function (err2, update_response) {
        if (err2) {
          console.log('=> Internal Server Error: ' + err2);
          res.status(500).send('Error updating apartment information in user');
        }
        if (update_response) {
          console.log('=> User ID found and updated with apt info!');
          res.sendStatus(201);
        } else {
          console.log('=> User NOT updated with apt info!!');
          res.status(400);
          res.send('User NOT updated with apt info!!');
        }
      });
    } else {
      res.status(400);
      res.send('Apartment DOESNOT exist!');
    }
  });
});

module.exports = router;
