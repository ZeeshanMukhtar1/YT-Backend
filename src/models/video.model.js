import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: [true, "videoFile is required!"],
    },
    thumbnail: {
      type: String,
      required: [true, "thumbnail is required!"],
    },
    title: {
      type: String,
      required: [true, "title is required!"],
    },
    description: {
      type: String,
      required: [true, "description is required!"],
    },
    duration: {
      // cloudinay gives the the duration of the video in response
      type: Number,
      required: [true, "duration is required!"],
    },
    view: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// injecting the plugin to the schema
videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
