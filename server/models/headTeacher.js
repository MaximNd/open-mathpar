const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const HeadTeacherSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  schoolId: {
      type: ObjectId,
      required: true,
      ref: 'School'
  }
});

const HeadTeacher = module.exports = mongoose.model('HeadTeacher', HeadTeacherSchema);