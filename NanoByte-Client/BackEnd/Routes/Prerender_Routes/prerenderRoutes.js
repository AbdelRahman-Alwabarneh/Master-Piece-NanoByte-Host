
const express = require('express');
const router = express.Router();
const prerenderController = require('../../Controllers/Prerender_Controller/prerenderController');

router.get("/", prerenderController.getAllPages);
router.post("/generate", prerenderController.generatePrerenderFiles);
router.post("/", prerenderController.createPage);
router.put("/:id", prerenderController.updatePage);
router.delete("/:id", prerenderController.deletePage);

module.exports = router;
