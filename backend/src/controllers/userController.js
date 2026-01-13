const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { password } = req.body;

    // ✅ Only password update allowed
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.userId, {
      password: hashedPassword
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
