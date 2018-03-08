const Lection = require('./../models/lection');

module.exports = {
    getLectionById(req, res) {

    },

    getLectionByTeacherId(req, res) {
        Lection.find({ teacherId: req.params.id })
            .then(lections => res.send(lections))
            .catch(err => console.log(err));
    },

    createLection(req, res) {
        const { name, text } = req.body;

        req.user.clients
            .then(clients => {
                const lection = new Lection({
                    teacherId: clients.find(client => client.clientRole === 'teacher').client.id,
                    name,
                    text
                });
                
                lection.save(err => {
                    if (err) {
                        console.log(err);
                    }
                    res.status(200, { message: 'ok' }).end();
                });
            });
    },

    updateLection(req, res) {

    },

    deleteLection(req, res) {

    }
};