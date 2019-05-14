const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

// Lection Schema
const LectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: [String]
    },
    teacherId: {
        type: ObjectId,
        required: true,
        ref: 'Teacher'
    },
    subjectId: {
        type: ObjectId,
        required: true,
        ref: 'Subject'
    },
    schoolId: {
        type: ObjectId,
        required: true,
        //ref: 'School'
        refPath: 'schoolModel'
    },
    schoolModel: {
      type: String,
      required: true,
      enum: ['School', 'University'],
      default: 'School'
    }
});

module.exports = mongoose.model('Lection', LectionSchema);