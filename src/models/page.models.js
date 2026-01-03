import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
  url: { type: String, unique: true, index: true },

  html: String,

  outgoingLinks: [
    {
      url: String,
      type: { type: String, enum: ["internal", "external"] },
    },
  ],

  incomingLinks: [String],
  outgoingCount: Number,
  incomingCount: Number,
  crawledAt: Date,
});

export const Page = mongoose.model("Page", PageSchema);
