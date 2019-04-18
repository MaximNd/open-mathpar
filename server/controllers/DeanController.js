const Dean = require('../models/dean');
const User = require('../models/user');
const { findShoollId, findUniversityId } = require('../helpers/helpers');

module.exports = {
    getDeanByID(req, res) {
        User.findById(req.params.id)
            .then(user => {
                user.clients
                    .then(clients => {
                        if (clients.find(client => client.clientRole === 'dean')) {
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

    async createDean(req, res) {
        try {
            const user = req.body.user;
            const deanUser = new User(user);
            await deanUser.save();
            
            req.user.clients
                .then(async clients => {
                    try {
                        const dean = new Dean({
                            userId: deanUser._id,
                            universityId: findUniversityId(clients, 'rector')
                        });
                        await dean.save();

                        res.status(200, { message: 'ok' }).end();
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    },

    updateDean(req, res) {
        
    },

    deleteDean(req, res) {
        
    }
};