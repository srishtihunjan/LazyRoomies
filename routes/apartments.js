var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var apartment = schema.Apartment;
var user = schema.User;

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET ALL apartments*/
router.get('/', function (req, res, next) {
  apartment.find(function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send("Error fetching apartment details");
    }
    console.log('=> Apartment Info queried!');
    res.status(200);
    res.send(response);
  });
});

/* GET apartment details by Id */
router.get('/id/:id', function (req, res, next) {
  apartment.findById(req.params.id, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send("Error fetching apartment details");
    }
    if (response != null && response != '') {
      console.log('=> Apartment Info queried!');
      res.status(200);
      res.send(response);
    } else {
      console.log('=> Apartment DOES NOT EXIST!');
      res.status(400);
      res.send('Apartment DOES NOT EXIST!');
    }
  });
});

/* GET apartment details by name */
router.get('/name/:name', function (req, res, next) {
  apartment.find({ name: req.params.name }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send("Error fetching apartment details");
    }
    console.log('=> Apartment Info queried!');
    res.status(200);
    res.send(response);
  });
});

/* INSERT apartment AND UPDATE User with AptId */
router.post('/', function (req, res, next) {
  apartment.create({
    name: req.body.name
  }, function (err1, response) {
    if (err1) {
      console.log('=> Internal Server Error: ' + err1);
      res.status(500).send("Error creating apartment");
    }
    console.log('=> Apt created with ID = ' + response._id);
    user.findByIdAndUpdate(req.body.userId, { apartmentName: req.body.name }, function (err2, update_response) {
      if (err2) {
        console.log('=> Internal Server Error: ' + err2);
        res.status(500).send("Error updating user");
      }
      if (update_response && update_response != '') {
        console.log('=> User ID found and updated with apt info!');
        res.sendStatus(201);
      } else {
        console.log('=> User NOT updated with apt info!!');
        res.status(400);
        res.send('User NOT updated with apt info!!');
      }
    });
  });
});

module.exports = router;
