const express = require("express");
const router = express.Router();
const dedicatedServerDetailsController = require("../Controllers/DedicatedServer_Controllers/dedicatedServerDetailsController");

router.get(
  "/:productLink",
  dedicatedServerDetailsController.DedicatedServerDetails
);
router.post(
  "/:productLink/:duration",
  dedicatedServerDetailsController.DedicatedServerDetailsPayment
);
router.post("/", dedicatedServerDetailsController.dedicatedServerQuantity);

module.exports = router;
