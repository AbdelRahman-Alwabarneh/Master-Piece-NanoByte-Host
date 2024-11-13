
const express = require('express');
const router = express.Router();
const vpsManagementControllers = require('../Controllers/vpsManagementControllers');

router.post('/', vpsManagementControllers.createVPSPlan);
router.get('/', vpsManagementControllers.VPSPlanSData);
router.get('/NotHidden', vpsManagementControllers.VPSPlansDataNotHidden);
router.get('/:id', vpsManagementControllers.VPSDetails);
router.put('/:id', vpsManagementControllers.updateVPSPlan);
router.patch('/:id', vpsManagementControllers.HiddenVPSPlan);



module.exports = router;
