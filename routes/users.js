var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var mongoose = require('mongoose');
var schema = require('../model/schema');
var user = schema.User;
var dbQuery = require('../db_setup/db_setup');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/:userId', function (req, res, next) {
    dbQuery(function (db) {
        user.findById(req.params.userId, function (err, response) {
            if (err) {
                console.log(err);
                res.statusCode(500).send("Error fetching users");
                db.close();
                return;
            }
            console.log('**Users queried!');
            res.statusCode(200);
            res.send(response);
            db.close();
        });
    });
});

router.post('/', function (req, res, next) {
    dbQuery((db) => {
        user.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        }, function (err, response) {
            if (err) {
                console.log(err);
                res.statusCode(500).send("Error inserting users");
                db.close();
                return;
            }
            console.log('User created!');
            db.close();
            res.sendStatus(201);
        });
    });
});

module.exports = router;
