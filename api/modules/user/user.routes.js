const router = require('express').Router();
const UserController = require('./user.controller');

router.get('/*', UserController.getUser);

module.exports = router;