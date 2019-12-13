import mongoose, { Schema, Document } from "mongoose";

// my typescript interface for my Database User model
export interface IBlog extends Document {
  owner_id: string;
  title: string;
  content: string;
  tags: [string];
  likes: number;
  createdAt: Date;
}

// my schema
const BlogSchema: Schema = new Schema({
  owner_id: { type: String, required: true },
  title: { type: String, required: true, maxlength: 45 },
  content: { type: String, required: true, unique: true, maxlength: 1000 },
  tags: { type: Array },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

// export my schema for use.
export default mongoose.model<IBlog>("Blog", BlogSchema);
