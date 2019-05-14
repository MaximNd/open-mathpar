const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RectorSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    isMainRector: {
        type: Boolean,
        required: true
    },
    access: {
        type: Boolean,
        required: true
    },
    universityId: {
        type: ObjectId,
        required: false,
        ref: 'University'
    }
});

module.exports = mongoose.model('Rector', RectorSchema);