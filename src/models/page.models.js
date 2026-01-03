import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    index: true,
  },
  html: String,
  outgoingLinks: [
    {
      url: String,
      type: {
        type: String,
        enum: ["internal", "external"],
      },
    },
  ],
  incomingLinks: [String],
  crawledAt: Date,
});

export const Page = mongoose.model("Page", pageSchema);
