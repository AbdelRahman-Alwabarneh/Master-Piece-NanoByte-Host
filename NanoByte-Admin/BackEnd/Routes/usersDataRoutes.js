
const express = require('express');
const router = express.Router();
const usersControllers = require('../Controllers/usersDataControllers');

router.get('/', usersControllers.UsersData);
router.post('/', usersControllers.AllUsersData);
router.get('/:id', usersControllers.UserDetails);
router.put('/:id', usersControllers.updateProfile);
router.patch('/:id', usersControllers.BannedUser);


module.exports = router;
