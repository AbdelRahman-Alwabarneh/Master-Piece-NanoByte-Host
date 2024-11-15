
const express = require('express');
const router = express.Router();
const DomainServiceControllers = require('../Controllers/DomainServiceControllers');

router.post('/', DomainServiceControllers.createDomainServicePlan);
router.get('/', DomainServiceControllers.DomainServicePlanData);
router.get('/:id', DomainServiceControllers.DomainServicePlanDetails);
router.put('/:id', DomainServiceControllers.updateDomainServicePlan);
router.patch('/:id', DomainServiceControllers.HiddenDomainServicePlan);

module.exports = router;
