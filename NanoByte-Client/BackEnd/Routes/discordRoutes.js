// routes/authRoutes.js
const express = require('express');
const { loginWithDiscord, handleDiscordCallback } = require('../Controllers/discordController');

const router = express.Router();

// مسار بدء تسجيل الدخول
router.get('/discord', loginWithDiscord);

// مسار استقبال رد المصادقة من Discord
router.get('/discord/callback', handleDiscordCallback);

module.exports = router;
