import mongoose, { Schema, Document } from "mongoose";

// my typescript interface for my Database User model
export interface IComment extends Document {
  blog_id: string;
  user_id: string;
  content: string;
  likes: number;
  createdAt: Date;
}

// my schema
const CommentSchema: Schema = new Schema({
  blog_id: { type: String, required: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true, maxlength: 100 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

// export my schema for use.
export default mongoose.model<IComment>("Comment", CommentSchema);
