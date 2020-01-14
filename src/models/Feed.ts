import mongoose, { Schema, Document } from "mongoose";

// my typescript interface for my Database User model
export interface IFeed extends Document {
  user_id: string;
  blog_id: string;
  content: string;
  likes: number;
  createdAt: Date;
}

// my schema
const FeedSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  blog_id: { type: String, default: "no blog", required: false },
  content: { type: String, required: true, maxlength: 300 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

// export my schema for use.
export default mongoose.model<IFeed>("Feed", FeedSchema);
