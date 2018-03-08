const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TeacherSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  schoolId: {
    type: ObjectId,
    required: true,
    ref: 'School'
  },
  timetable: {
    type: [
      {
        subjectId: {
          type: ObjectId,
          ref: 'Subject',
          required: true
        },
        groupId: {
          type: ObjectId,
          ref: 'Group',
          required: true
        },
        planId: {
          type: ObjectId,
          ref: 'Plan',
          required: false
        }
      }
    ],
    required: true
  }
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);