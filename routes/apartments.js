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

/* GET apartment details by Id */
router.get('/id/:id', function (req, res, next) {
  dbQuery(function (db) {
    apartment.findById(req.params.id, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching apartment details");
        db.close();
        return;
      }
      console.log('**Apartment Info queried!');
      res.status(200);
      res.send(response);
      db.close();
    });
  });
});

/* GET apartment details by name */
router.get('/name/:name', function (req, res, next) {
  dbQuery(function (db) {
    apartment.findById(req.params.apartmentId, function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching apartment details");
        db.close();
        return;
      }
      console.log('**Apartment Info queried!');
      res.status(200);
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
        res.status(500).send("Error creating apartment");
        db.close();
        return;
      }
      if (response != null && response != '') {
        console.log('Apartment created! ' + response);
        res.sendStatus(201);
        db.close();
      } else {
        console.log('Apartment NOT created! '+response);
        res.status(400);
        res.send('Apartment NOT created! Name is UNIQUE!');
      }
      db.close();
    });
  });
});

module.exports = router;
