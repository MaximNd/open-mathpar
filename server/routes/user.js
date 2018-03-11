const router = require('express').Router();
const AuthenticationController = require('./../controllers/AuthenticationController');
const UsersController = require('./../controllers/UsersController');
const isAuthenticated = require('./../policies/isAuthenticated');
const passport = require('passport');

router.get('/user/:id', isAuthenticated, UsersController.getUserById);
router.get('/auth/user', passport.authenticate('jwt', { session: false }), AuthenticationController.login);
router.post('/user/login', passport.authenticate('local', { session: false }), AuthenticationController.login);
router.post('/user/signup', AuthenticationController.register);

module.exports = router;