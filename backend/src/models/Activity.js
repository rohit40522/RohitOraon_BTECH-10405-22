const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE"],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    meta: {
      from: String,
      to: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
