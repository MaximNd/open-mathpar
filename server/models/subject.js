const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    themes: [
        {
            type: ObjectId,
            ref: 'Theme'
        }
    ]
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;

// "themes" : [ 
//     {
//         "name" : "Theme1(Math1)",
//         "order" : 1
//     }, 
//     {
//         "name" : "Theme2(Math1)",
//         "order" : 2
//     }
// ]