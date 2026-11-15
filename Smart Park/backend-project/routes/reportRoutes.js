const router = require("express").Router();
const c = require("../controllers/reportController");
const auth = require("../middleware/authMiddleware");
router.get("/monthly", auth, c.monthly);
module.exports = router;
