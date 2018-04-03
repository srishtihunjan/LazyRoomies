const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Err:Users must specify their name']
  },
  email: {
    type: String,
    required: [true, 'Err:Users must specify email'],
    unique: true
  },
  phone: Number,
  password: {
    type: String,
    required: [true, 'Err:Password is required']
  },
  apartmentName: {
    type: String
  }
})

var User = mongoose.model('User', userSchema)

var taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Err:Tasks must have a name']
  },
  description: String,
  createdBy: {
    type: String
  },
  timeDue: {
    type: Date,
    default: Date.now,
    required: [true, 'Err:Tasks must have a timeDue']
  },
  dateDue: {
    type: Date,
    default: Date.now,
    required: [true, 'Err:Tasks must have a dateDue']
  },
  assignedTo: [String], // change order on recurring
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Completed', 'Overdue'],
    required: [true, 'Err:Tasks must be given a status']
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPeriod: {
    type: String,
    default: 'Weekly',
    enum: ['Daily', 'Weekly', 'Monthly']
  },
  apartmentName: {
    type: String,
    required: true
  }
})

var apartmentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Err:Apartments must be given a name'],
    unique: true
  },
  shoppingList: [String]
})

var Task = mongoose.model('Task', taskSchema)
var Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = {
  User: User,
  Apartment: Apartment,
  Task: Task
}
