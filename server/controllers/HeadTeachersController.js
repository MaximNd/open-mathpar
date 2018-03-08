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

    createHeadTeacher(req, res) {
        const user = req.body.user;
        User.createUser(new User(user), (err, userId) => {
            if (err) {
                console.log(err);
            }
            req.user.clients
                .then(clients => {
                    const headTeacher = new HeadTeacher({
                        userId,
                        schoolId: findShoollId(clients, 'director')
                    });
                
                    headTeacher.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    
                        res.status(200, { message: 'ok' }).end();
                    });
                });
        });
    },

    updateHeadTeacher(req, res) {
        
    },

    deleteHeadTeacher(req, res) {
        
    }
};