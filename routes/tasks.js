var express = require('express');
var router = express.Router();
var schema = require('../model/schema');
var taskRouter = schema.Task;

var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET details of all tasks by Apartment Name */
router.get('/:apartmentName', function (req, res, next) {
  taskRouter.find({ apartmentName: req.params.apartmentName }, {}, { sort: { timeDue: 1 } }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error fetching task details');
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
  });
});

/* INSERT NEW Task */
router.post('/insert', function (req, res, next) {
  let newAssignedToList = [];
  if (req.body.assignedTo) {
    let list = String(req.body.assignedTo).split(',');
    for (var user in list) {
      newAssignedToList.push(list[user])
    }
  }
  console.log('=> Task newAssignedToList= ' + newAssignedToList);
  taskRouter.create({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    timeDue: req.body.timeDue,
    dateDue: req.body.dateDue,
    assignedTo: newAssignedToList,
    status: req.body.status,
    isRecurring: req.body.isRecurring,
    recurringPeriod: req.body.recurringPeriod,
    apartmentName: req.body.apartmentName
  }, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error inserting task list: ' + err);
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
  });
});

/* UPDATE Completed Tasks */
router.post('/completed', function (req, res, next) {
  let taskObject = {
    name: req.body.name,
    description: req.body.description,
    createdBy: req.body.createdBy,
    timeDue: req.body.timeDue,
    dateDue: req.body.dateDue,
    status: req.body.status,
    isRecurring: req.body.isRecurring,
    recurringPeriod: req.body.recurringPeriod,
    apartmentName: req.body.apartmentName
  }

  let assignedToList = [];
  if (req.body.assignedTo) {
    let list = String(req.body.assignedTo).split(',');
    for (var user in list) {
      assignedToList.push(list[user])
    }
  }
  taskObject.assignedTo = assignedToList;

  if (req.body.isRecurring === true) {
    var dueDate = new Date(req.body.dateDue);
    var dueTime = new Date(req.body.timeDue);
    let newAssignedToList = [];
    if (req.body.assignedTo) {
      let list = String(req.body.assignedTo).split(',');
      for (var i = 1; i < list.length; i++) {
        newAssignedToList.push(list[i]);
      }
      newAssignedToList.push(list[0]);
    }
    taskObject.assignedTo = newAssignedToList;

    var addDays = req.body.recurringPeriod === 'Daily' ? 1 :
      req.body.recurringPeriod === 'Weekly' ? 7 :
        req.body.recurringPeriod === 'Monthly' ? 30 : 0;
        
    dueDate.setDate(dueDate.getDate() + addDays);
    taskObject.dateDue = dueDate;

    dueTime.setDate(dueTime.getDate() + addDays);
    taskObject.timeDue = dueTime;

    taskObject.status = 'Active';
  }
  else {
    taskObject.status = 'Completed';
  }

  taskRouter.findByIdAndUpdate(req.body._id, taskObject, function (err, response) {
    if (err) {
      console.log('=> Internal Server Error: ' + err);
      res.status(500).send('Error inserting task list: ' + err);
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
  });
});

/* DELETE a task by ID */
router.delete('/:id', function (req, res, next) {
  taskRouter.findByIdAndRemove(req.params.id, function (err, response) {
    if (err) {
      console.log('=> ServerErr: Task Deletion => ' + err);
      res.status(500).send('Error deleting task: ' + err);
      return;
    }
    if (response && response != '') {
      console.log('=> Task DELETED! ' + response);
      res.sendStatus(200);
    } else {
      console.log('=> Task NOT Deleted!');
      res.status(400);
      res.send('Task NOT Deleted!');
    }
  });
});

module.exports = router;
