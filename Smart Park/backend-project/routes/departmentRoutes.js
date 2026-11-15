const router = require("express").Router();
const c = require("../controllers/departmentController");
const auth = require("../middleware/authMiddleware");
router.get("/", auth, c.list);
router.post("/", auth, c.create);
module.exports = router;
