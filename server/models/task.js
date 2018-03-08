const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new Schema({
  subjectId: {
    type: ObjectId,
    ref: 'Subject'
  },
  teacherId: {
    type: ObjectId,
    ref: 'Teacher'
  },
  name: String,
  isTest: Boolean,
  isAllow: Boolean,
  exercises: {
    type: [
      {
        text: String,
        fullSolution: String,
        answer: String,
        description: {
            type: String,
            required: false
        },
        images: {
          type: [String],
          required: false
        }
      }
    ],
    required: true
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);
