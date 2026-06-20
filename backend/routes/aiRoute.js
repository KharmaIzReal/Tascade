const express = require("express");
const router = express.Router();
const { suggestPriority, breakdownTask } = require("../controllers/aiController");

router.post("/priority", suggestPriority);
router.post("/breakdown", breakdownTask);

module.exports = router;