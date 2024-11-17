
const express = require('express');
const router = express.Router();
const tutorialGroupControllers = require('../Controllers/tutorialGroupControllers');

router.post('/', tutorialGroupControllers.CreateTutorialGroup);
router.get('/', tutorialGroupControllers.GetTutorialGroup);
router.get('/:id', tutorialGroupControllers.GetDetailsTutorialGroup);
router.patch('/:id', tutorialGroupControllers.AddTutorialToGroup);
router.put('/:id', tutorialGroupControllers.UpdateTutorialGroup);



module.exports = router;
