const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller/index");
const authenticateMiddleware = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
<<<<<<< HEAD
router.get("/check-auth",authenticateMiddleware,(req,res) => {
=======
router.post("/check-auth",authenticateMiddleware,(req,res) => {
>>>>>>> 23a8e5a342886d56f4671f89873239e6198dca7a
    const user = req.user
    res.status(200).json({
        success : true,
        message : 'Authenticated user!'
    })
})

module.exports = router;
