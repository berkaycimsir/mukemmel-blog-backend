import mongoose, { Schema, Document } from "mongoose";
import { StringifyOptions } from "querystring";

// my typescript interface for my Database User model
export interface IBlog extends Document {
  owner_id: string;
  title: string;
  content: string;
  tags: [string];
  likes: number;
  img: string;
  views: number;
  category: string;
  createdAt: Date;
}

// my schema
const BlogSchema: Schema = new Schema({
  owner_id: { type: String, required: true },
  title: { type: String, required: true, maxlength: 45 },
  content: { type: String, required: true, maxlength: 10000 },
  tags: { type: Array },
  likes: { type: Number, default: 0 },
  img: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

// export my schema for use.
export default mongoose.model<IBlog>("Blog", BlogSchema);
