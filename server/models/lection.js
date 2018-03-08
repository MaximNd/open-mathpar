const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

// Lection Schema
const LectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    teacherId: {
        type: ObjectId,
        required: true,
        ref: 'Teacher'
    }
});

module.exports = mongoose.model('Lection', LectionSchema);