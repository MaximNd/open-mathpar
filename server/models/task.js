const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// const Classes

const TaskSchema = new Schema({
  schoolId: {
    type: ObjectId,
    //ref: 'School'
    refPath: 'schoolModel'
  },
  schoolModel: {
    type: String,
    required: false,
    enum: ['School', 'University'],
    default: 'School'
  },
  // filter
  subjectId: {
    type: ObjectId,
    ref: 'Subject'
  },
  // filter
  teacherId: {
    type: ObjectId,
    ref: 'Teacher'
  },
  isTest: Boolean,
  isAllow: Boolean,
  // filter
  class: Number,
  // filter
  difficultyLevel: String,
  // filter
  theme: {
    type: ObjectId,
    ref: 'Theme',
    required: true
  },
  // filter
  name: String,
  order: Number,
  countOfVariants: {
    type: Number,
    required: true
  },
  exercises: {
    type: [
      {
        text: String,
        fullSolution: String,
        answer: String,
        images: {
          type: [String],
          required: false
        },
        variant: Number
      }
    ],
    required: true
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);
