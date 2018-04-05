var express = require('express');
var router = express.Router();
// var path = require('path');
// var app = require('../app');
// var mongoose = require('mongoose');
var schema = require('../model/schema');
var apartment = schema.Apartment;

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET shopping list  by apartment Name */
router.get('/:apartmentName', function (req, res, next) {
  apartment.find({ name: req.params.apartmentName }, 'shoppingList', function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error fetching shopping list');
      return;
    }
    console.log('=> ShoppingList queried! ' + response);
    res.status(200);
    res.send(response);
  });
});

/* POST shopping list by apartment Name */
router.post('/', function (req, res, next) {
  let list = String(req.body.shoppingList).split(',');
  let shoppingList = [];
  for (var item in list) {
    shoppingList.push(list[item])
  }
  apartment.findOneAndUpdate({ name: req.body.apartmentName }, { shoppingList: shoppingList }, function (err, updateResponse) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error updating shopping list');
      return;
    }
    if (updateResponse && updateResponse !== '') {
      console.log('=> Apartment Exists. ShoppingList inserted! ' + updateResponse);
      res.sendStatus(201);
    } else {
      console.log('=> Apartment DOSENT exist. ' + updateResponse);
      res.status(400);
      res.send('Apartment DOESNT exist!');
    }
  });
});

module.exports = router;
