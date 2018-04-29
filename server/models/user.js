const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');
const Student = require('./../models/student');
const Teacher = require('./../models/teacher');
const HeadTeacher = require('./../models/headTeacher');
const Director = require('../models/director');
const Authority = require('../models/authority');

// User Schema
const UserSchema = new Schema({
	firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    birthday: Date,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: [String],
    image: {
        type: String,
        required: false,
        default: '61ljiwkja03a19r.jpeg'
    }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

UserSchema.virtual('fullName').get(function() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
});

UserSchema.virtual('clients').get(function() {
    function getClientByRole(user) {
        const rolesMap = {
            'student': Student,
            'teacher': Teacher,
            'headTeacher': HeadTeacher,
            'director': Director,
            'admin': Authority
        }
        return user.role.map(role =>  {
            let resClientsPromise = rolesMap[role].find({ userId: user.id });
            if (role === 'student') {
                resClientsPromise.populate('gradeBook.taskId', 'isTest subjectId');
            }
            if (role === 'teacher') {
                resClientsPromise.populate('timetable.subjectId').populate('timetable.groupId');
            }
            resClientsPromise.populate('schoolId', 'name');
            return resClientsPromise.then(client => {
                    const roles = {
                        'Student': 'student',
                        'Teacher': 'teacher',
                        'HeadTeacher': 'headTeacher',
                        'Director': 'director',
                        'Authority': 'admin'
                    };
                    return { clientRole: roles[client[0].constructor.modelName], client: client[0] };
                });
            });
    };
    // const clients = 
    return Promise.all(getClientByRole(this));
});

UserSchema.virtual('age').get(function() {
    var ageDifMs = Date.now() - this.birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const User = module.exports = mongoose.model('User', UserSchema);