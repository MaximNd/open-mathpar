const Director = require('./../models/director');
const User = require('./../models/user');

module.exports = {
    getDirectorById(req, res) {
        User.findById(req.params.id)
            .then(user => {
                user.clients
                    .then(clients => {
                        if (clients.find(client => client.clientRole === 'director')) {
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

    getDirectorBySchoolId(req, res) {

    },

    createDirector(req, res) {

    },

    updateDirector(req, res) {

    }
    // ,
    // deleteDirector(req, res) {

    // }
};