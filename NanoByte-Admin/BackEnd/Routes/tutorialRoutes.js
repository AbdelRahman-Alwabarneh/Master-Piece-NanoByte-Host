
const express = require('express');
const router = express.Router();
const tutorialControllers = require('../Controllers/tutorialControllers');

router.post('/', tutorialControllers.createTutorial);
router.get('/', tutorialControllers.TutorialData);
router.get('/:id', tutorialControllers.TutorialDetails);
router.put('/:id', tutorialControllers.updateTutorial);
router.patch('/:id', tutorialControllers.HiddenTutorial);



module.exports = router;
