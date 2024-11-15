
const express = require('express');
const router = express.Router();
const GroupGameHostingControllers = require('../Controllers/GroupGameHostingControllers');

router.post('/', GroupGameHostingControllers.CreateGamesHostingGroup);
router.get('/', GroupGameHostingControllers.GetGamesHostingGroup);
router.get('/AllGamesHostingGroup', GroupGameHostingControllers.GetAllGamesHostingGroup);
router.get('/:id', GroupGameHostingControllers.GetDetailsGamesHostingGroup);
router.put('/:id', GroupGameHostingControllers.updateGameHostingGroup);
router.patch('/:id', GroupGameHostingControllers.AddPlanToGroup);


module.exports = router;
