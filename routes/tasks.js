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
        apartment.findById(req.params.apartmentId, 'tasks', function (err, response) {
            if (err) {
                console.log(err);
                res.statusCode(500).send("Error fetching task details");
                db.close();
                return;
            }
            console.log('**Task Info queried!');
            res.statusCode(200);
            res.send(response);
            db.close();
        });
    });
});

router.post('/:apartmentId', function (req, res, next) {
    dbQuery((db) => {
        let list = String(req.body.tasks).split(",");
        let shopping_list = [];
        for (item in list) {
            shopping_list.push(list[item])
        }
        apartment.findByIdAndUpdate(req.body.apartmentId, { tasks: task_list }, function (err, update_response) {
            if (err) {
                console.log(err);
                res.statusCode(500).send("Error inserting task list");
                db.close();
                return;
            }
            console.log('Tasks inserted! ');
            res.sendStatus(201);
            db.close();
        });
    });
});

module.exports = router;
