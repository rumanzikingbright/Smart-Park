const router = require("express").Router();
const c = require("../controllers/authController");
router.post("/login", c.login);
router.get("/check", c.check);
router.post("/logout", c.logout);
module.exports = router;
