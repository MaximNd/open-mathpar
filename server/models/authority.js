const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Authority Schema
const AuthoritySchema = new Schema({
    userId: {
        type: ObjectId,
        required: false,
        ref: 'User'
    },
    company: {
        type: String,
        required: true
    },
    authorityId: {
        type: ObjectId,
        required: false,
        ref: 'Authority'
    }
});

const Authority = module.exports = mongoose.model('Authority', AuthoritySchema);