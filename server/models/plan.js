const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PlanSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupId: {
        type: ObjectId,
        ref: 'Group',
        required: true
    },
    teacherId: {
        type: ObjectId,
        ref: 'Teacher',
        required: true
    },
    subjectId: {
        type: ObjectId,
        ref: 'Subject',
        required: true
    },
    timetable: {
        type: [
            {
                lectionId: {
                    type: ObjectId,
                    ref: 'Lection',
                    required: true
                },
                taskId: {
                    type: ObjectId,
                    ref: 'Task',
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ],
        required: true
    }
});

const Plan = module.exports = mongoose.model('Plan', PlanSchema);