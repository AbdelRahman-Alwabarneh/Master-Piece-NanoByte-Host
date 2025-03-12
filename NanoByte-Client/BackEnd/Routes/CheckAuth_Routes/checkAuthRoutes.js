const express = require("express");
const router = express.Router();
const checkAuthControllers = require("../../Controllers/CheckAuth_Controllers/checkAuthControllers");

router.get("/", checkAuthControllers.checkAuth);

module.exports = router;
