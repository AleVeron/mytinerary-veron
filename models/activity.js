const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activities: [
    {
      title: { type: String, required: true },
      img: { type: String, required: true },
    },
  ],
  itinerary: {
    type: mongoose.Types.ObjectId,
    ref: "itinerary",
    required: true,
  }
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;