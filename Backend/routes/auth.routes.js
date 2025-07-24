const express = require("express");
const { signup, login, updateProfilePicture } = require("../controllers/auth.controllers");
const verifyToken =require('../utlis/verifyToken')
const upload = require("../utlis/upload");
const router = express.Router();

router.post("/signup", upload.single("profilePicture"), signup);
router.post("/login", login);
router.post("/update-profile-picture", verifyToken, upload.single("profilePicture"), updateProfilePicture);

module.exports = router;