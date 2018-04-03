var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var user = schema.User;
var apartment = schema.Apartment;
var dbQuery = require('../db_setup/db_setup');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET ALL users in the system */
router.get('/', function (req, res, next) {
  dbQuery(function (db) {
    user.find(function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Server error fetching user details');
        db.close();
        return;
      }
      console.log('=> User Info queried: ' + response);
      if (response && response != '') {
        res.status(200);
        res.send(response);
      } else {
        res.sendStatus(400);
      }
      db.close();
    });
  });
});

/* GET details of 1 user by UserId */
router.get('/:userId', function (req, res, next) {
  dbQuery(function (db) {
    user.findById(req.params.userId, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Error fetching users');
        db.close();
        return;
      }
      console.log('=> Users queried!');
      res.status(200);
      res.send(response);
      db.close();
    });
  });
});

/* Login Page: GET details of 1 user by email */
router.get('/login/:emailId/:password', function (req, res, next) {
  dbQuery(function (db) {
    user.find({ email: req.params.emailId, password: req.params.password }, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Server error fetching user details');
        db.close();
        return;
      }
      console.log('=> User Info queried! ');
      if (response && response != '') {
        res.status(200);
        res.send(response);
      } else {
        res.status(401);
        res.send('User Authentication Failed!');
      }
      db.close();
    });
  });
});

/* GET if user email exists */
/* Login Page: GET details of 1 user by email */
router.get('/validateemail/:emailId', function (req, res, next) {
  dbQuery(function (db) {
    user.find({ email: req.params.emailId }, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send('Server error fetching user details');
        db.close();
        return;
      }
      console.log('**User Info queried! ');
      if (response && response != '') {
        res.status(200);
        res.send('true');
      } else {
        res.status(200);
        res.send('false');
      }
      db.close();
    });
  });
});

/* GET ALL users in Apartment */
router.get('/all/:aptName', function (req, res, next) {
  dbQuery(function (db) {
    user.find({ apartmentName: req.params.aptName }, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Server error fetching user details');
        db.close();
        return;
      }
      console.log('=> User Info queried: ' + response);
      if (response && response != '') {
        res.status(200);
        res.send(response);
      } else {
        res.sendStatus(400);
      }
      db.close();
    });
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

  dbQuery((db) => {
    if (req.body.apartmentName) {
      console.log('=> Inside IF AptName given');
      apartment.findOne({ name: req.body.apartmentName }, function (err, response) {
        if (err) {
          console.log('=> Internal Server Error: ' + err);
          res.status(500).send('Error finding apartment name');
          db.close();
          return;
        }
        console.log('=> apartment search: ' + response);
        if (response && response != '') {
          console.log('=> Inside IF Apt FOUND');
          user.create(userObj, function (err1, user_response) {
            if (err1) {
              console.log('=> Internal Server Error: ' + err1);
              res.status(500).send('Error inserting users');
              db.close();
              return;
            }
            console.log('=> User created! ' + user_response);
            res.sendStatus(201);
            db.close();
          });
        } else {
          console.log('=> Invalid Apartment Name. User creation FAILED!');
          res.status(400);
          res.send('Invalid Apartment Name. User creation FAILED!');
          db.close();
        }
      });
    } else {
      user.create(userObj, function (err, response) {
        if (err) {
          console.log('=> Internal Server Error: ' + err);
          res.status(500).send('Error inserting users');
          db.close();
          return;
        }
        console.log('=> User created!');
        res.status(201);
        res.send(response);
        db.close();
      });
    }
  });
});

/* POST: UPDATE User with Apt Id */
router.post('/joinapt', function (req, res, next) {
  dbQuery((db) => {
    apartment.findOne({ name: req.body.apartmentName }, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Error finding Apartment');
        db.close();
        return;
      }
      if (response != null && response != '') {
        console.log('=> Apt created with ID = ' + response._id);
        user.findByIdAndUpdate(req.body.userId, { apartmentName: req.body.apartmentName }, function (err2, update_response) {
          if (err2) {
            console.log('=> Internal Server Error: ' + err2);
            res.status(500).send('Error updating apartment information in user');
            db.close();
            return;
          }
          if (update_response) {
            console.log('=> User ID found and updated with apt info!');
            res.sendStatus(201);
          } else {
            console.log('=> User NOT updated with apt info!!');
            res.status(400);
            res.send('User NOT updated with apt info!!');
          }
          db.close();
        });
      } else {
        res.status(400);
        res.send('Apartment DOESNOT exist!');
        db.close();
      }
    });
  });
});

module.exports = router;
