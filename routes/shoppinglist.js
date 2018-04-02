var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var apartment = schema.Apartment;
var dbQuery = require('../db_setup/db_setup');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET shopping list  by apartment Id*/
router.get('/:apartmentId', function (req, res, next) {
  dbQuery((db) => {
    apartment.findById(req.params.apartmentId, 'shoppingList', function (err, response) {
      if (err) {
        console.log(err);
        res.status(500).send("Error fetching shopping list");
        db.close();
        return;
      }
      console.log('**ShoppingList queried! ' + response);
      res.status(200);
      res.send(response);
      db.close();
    });
  });
});

/* POST shopping list by apartment Id*/
router.post('/', function (req, res, next) {
  dbQuery((db) => {
    let list = String(req.body.shoppingList).split(",");
    let shopping_list = [];
    for (item in list) {
      shopping_list.push(list[item])
    }
    apartment.findByIdAndUpdate(req.body.apartmentId, { shoppingList: shopping_list }, function (err, update_response) {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating shopping list");
        db.close();
        return;
      }
      console.log('**ShoppingList inserted! ');
      res.sendStatus(200);
      db.close();
    });
  });
});

module.exports = router;