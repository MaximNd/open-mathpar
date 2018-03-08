const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Director Schema
const DirectorSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    isMainDirector: {
        type: Boolean,
        required: true
    },
    access: {
        type: Boolean,
        required: true
    },
    schoolId: {
        type: ObjectId,
        required: false,
        ref: 'School'
    }
});

const Director = module.exports = mongoose.model('Director', DirectorSchema);