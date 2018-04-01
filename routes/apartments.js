var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var apartment = schema.Apartment;
var user = schema.User;
var dbQuery = require('../db_setup/db_setup');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/:apartmentId', function (req, res, next) {
  dbQuery(function (db) {
    apartment.findById(req.params.apartmentId, function (err, response) {
      if (err) {
        console.log(err);
        res.statusCode(500).send("Error fetching apartment details");
        db.close();
        return;
      }
      console.log('**Apartment Info queried!');
      res.statusCode(200);
      res.send(response);
      db.close();
    });
  });
});

router.post('/', function (req, res, next) {
  dbQuery((db) => {
    apartment.create({
      name: req.body.name
    }, function (err1, response) {
      if (err1) {
        console.log(err1);
        res.statusCode(500).send("Error creating apartment");
        db.close();
        return;
      }
      console.log('Apt created with ID = ' + response._id);
      user.findByIdAndUpdate(req.body.userId, { apartmentID: response._id }, function (err2, update_response) {
        if (err2) {
          console.log('User ID not found or updated with apartmentID');
          res.statusCode(500).send("Error updating apartment information in user");
          db.close();
          return;
        }
        if (update_response) {
          console.log('User ID found and updated with apt info!');
          res.sendStatus(201);
        } else {
          console.log('User NOT updated with apt info!!');
          res.statusCode(400);
          res.send('User NOT updated with apt info!!');
        }
        db.close();
      });
    });
  });
});

module.exports = router;
