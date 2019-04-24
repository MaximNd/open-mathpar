const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const ThemeSchema = new Schema({
    name: String,
    school: {
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
    },
    teacher: {
        type: ObjectId,
        ref: 'Teacher',
        required: true
    },
    order: Number,
    class: Number
});

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;