var express = require('express');
var router = express.Router();
var schema = require('../model/schema');
var taskRouter = schema.Task;
var dbQuery = require('../db_setup/db_setup');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET details of all tasks by Apartment Name */
router.get('/:apartmentName', function (req, res, next) {
  dbQuery(function (db) {
    taskRouter.find({ apartmentName: req.params.apartmentName }, {}, {sort : {timeDue : 1}}, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Error fetching task details');
        db.close();
        return;
      }
      if (response && response != '') {
        console.log('=> Task Info queried!');
        res.status(200);
        res.send(response);
      } else {
        console.log('=> NO tasks found for ' + req.params.apartmentName);
        res.status(200);
        res.send('NO tasks found for ' + req.params.apartmentName);
      }
      db.close();
    });
  });
});

/* INSERT NEW Task */
router.post('/insert', function (req, res, next) {
  let assignedToList = [];
  if (req.body.assignedTo) {
    let list = String(req.body.assignedTo).split(',');
    for (var user in list) {
      assignedToList.push(list[user])
    }
  }
  console.log('=> Task assignedToList= ' + assignedToList);
  dbQuery((db) => {
    taskRouter.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.body.createdBy,
      timeDue: req.body.timeDue,
      dateDue: req.body.dateDue,
      assignedTo: assignedToList,
      status: req.body.status,
      isRecurring: req.body.isRecurring,
      recurringPeriod: req.body.recurringPeriod,
      apartmentName: req.body.apartmentName
    }, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Error inserting task list: ' + err);
        db.close();
        return;
      }
      if (response && response != '') {
        console.log('=> Tasks inserted! ' + response);
        res.sendStatus(201);
      } else {
        console.log('=> Tasks NOT inserted!');
        res.status(400);
        res.send('Tasks NOT inserted!');
      }
      db.close();
    });
  });
});

/* UPDATE a Task */
router.post('/update', function (req, res, next) {
  let assignedToList = [];
  if (req.body.assignedTo) {
    let list = String(req.body.assignedTo).split(',');
    for (var user in list) {
      assignedToList.push(list[user])
    }
  }
  console.log('=> Task assignedToList= ' + assignedToList);
  dbQuery((db) => {
    taskRouter.findByIdAndUpdate(req.body.taskId, {
      name: req.body.name,
      description: req.body.description,
      createdBy: req.body.createdBy,
      timeDue: req.body.timeDue,
      dateDue: req.body.dateDue,
      assignedTo: assignedToList,
      status: req.body.status,
      isRecurring: req.body.isRecurring,
      recurringPeriod: req.body.recurringPeriod,
      apartmentName: req.body.apartmentName
    }, function (err, response) {
      if (err) {
        console.log('=> Internal Server Error: ' + err);
        res.status(500).send('Error inserting task list: ' + err);
        db.close();
        return;
      }
      if (response && response != '') {
        console.log('=> Tasks Updated! ' + response);
        res.sendStatus(201);
      } else {
        console.log('=> Tasks NOT Updated!');
        res.status(400);
        res.send('=> Tasks NOT Updated!');
      }
      db.close();
    });
  });
});

module.exports = router;
