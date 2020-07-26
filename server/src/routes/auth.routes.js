//Imports
const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/auth.controller");
const { registerUser } = require("../controllers/auth.controller");

//Routes

router.post("/api/user/login", loginUser);
router.post("/api/user/register",registerUser);

//Export module
module.exports = router;
