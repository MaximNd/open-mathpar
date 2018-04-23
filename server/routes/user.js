const router = require('express').Router();
const AuthenticationController = require('./../controllers/AuthenticationController');
const UsersController = require('./../controllers/UsersController');
const isAuthenticated = require('./../policies/isAuthenticated');
const passport = require('passport');
const path = require('path');
const uniqid = require('uniqid');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
        cb(null, uniqid() + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/user/:id', isAuthenticated, UsersController.getUserById);
router.get('/auth/user', passport.authenticate('jwt', { session: false }), AuthenticationController.login);
router.post('/user/login', passport.authenticate('local', { session: false }), AuthenticationController.login);
router.post('/user/signup', upload.fields([{ name: 'director', maxCount: 1 }, { name: 'authority', maxCount: 1 }]), AuthenticationController.register);

module.exports = router;