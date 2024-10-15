
const express = require('express');
const router = express.Router();
const DedicatedServerManagementControllers = require('../Controllers/DedicatedServerManagementControllers');

router.post('/', DedicatedServerManagementControllers.createDedicatedServer);
router.get('/', DedicatedServerManagementControllers.DedicatedServerData);
router.get('/:id', DedicatedServerManagementControllers.DedicatedServerDetails);
router.put('/:id', DedicatedServerManagementControllers.updateDedicatedServer);
router.patch('/:id', DedicatedServerManagementControllers.HiddenDedicatedServer);

module.exports = router;
