const Activity = require("../models/Activity");

exports.getActivity = async (req, res) => {
  const activity = await Activity.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(activity);
};
