const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { updateProfile, deleteProfile, getProfile } = require("../controllers/userController");

router.put("/me", auth, updateProfile);
router.delete("/me", auth, deleteProfile);
router.get("/me", auth, getProfile); 

module.exports = router;
