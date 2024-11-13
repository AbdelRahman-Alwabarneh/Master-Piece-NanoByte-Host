
const express = require('express');
const router = express.Router();
const websiteHostingControllers = require('../Controllers/websiteHostingControllers');

router.post('/', websiteHostingControllers.createWebsiteHostingPlan);
router.get('/', websiteHostingControllers.WebsiteHostingPlanData);
router.get('/:id', websiteHostingControllers.WebsiteHostingPlanDetails);
router.put('/:id', websiteHostingControllers.updateWebsiteHostingPlan);
router.patch('/:id', websiteHostingControllers.HiddenWebsiteHostingPlan);


module.exports = router;
