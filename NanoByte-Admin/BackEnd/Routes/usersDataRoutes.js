
const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/usersDataControllers');

router.get('/', usersControllers.UsersData);
router.get('/:id', usersControllers.UserDetails);
router.put('/:id', usersControllers.updateProfile);


module.exports = router;
