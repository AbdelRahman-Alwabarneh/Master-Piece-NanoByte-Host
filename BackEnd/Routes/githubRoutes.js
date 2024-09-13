const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../Controllers/githubController');

// GitHub login route
router.get('/github', passport.authenticate('github', { scope: ['user:email', 'user:profile'] }));

// GitHub callback route
router.get('/github/callback', passport.authenticate('github', { session: false }), authController.githubCallback);

module.exports = router;
