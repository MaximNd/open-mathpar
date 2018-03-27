const HeadTeacher = require('./../models/headTeacher');
const User = require('./../models/user');
const { findShoollId } = require('./../helpers/helpers');

module.exports = {
    getHeadTeacherByID(req, res) {
        User.findById(req.params.id)
            .then(user => {
                user.clients
                    .then(clients => {
                        if (clients.find(client => client.clientRole === 'headTeacher')) {
                            res.send({
                                user,
                                clients
                            });
                        } else {
                            res.status(500).json({ message: 'No such client' });
                        }
                    });
            });
    },

    async createHeadTeacher(req, res) {
        try {
            const user = req.body.user;
            const headTeacherUser = new User(user);
            await headTeacherUser.save();
            
            req.user.clients
                .then(async clients => {
                    try {
                        const headTeacher = new HeadTeacher({
                            userId: headTeacherUser._id,
                            schoolId: findShoollId(clients, 'director')
                        });
                    
                        await headTeacher.save();

                        res.status(200, { message: 'ok' }).end();
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },

    updateHeadTeacher(req, res) {
        
    },

    deleteHeadTeacher(req, res) {
        
    }
};