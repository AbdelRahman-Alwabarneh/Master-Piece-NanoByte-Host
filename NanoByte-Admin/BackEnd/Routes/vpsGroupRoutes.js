
const express = require('express');
const router = express.Router();
const vpsGroupControllers = require('../Controllers/vpsGroupControllers');

router.post('/', vpsGroupControllers.CreatevpsGroup);
router.get('/', vpsGroupControllers.GetvpsGroup);
router.get('/:id', vpsGroupControllers.GetDetailsvpsGroup);
router.patch('/:id', vpsGroupControllers.AddPlanToGroup);
router.put('/:id', vpsGroupControllers.UpdatevpsGroup);



module.exports = router;
