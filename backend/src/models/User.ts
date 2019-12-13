import mongoose, { Schema, Document } from "mongoose";

// my typescript interface for my Database User model
export interface IUser extends Document {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// my schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

// export my schema for use.
export default mongoose.model<IUser>("User", UserSchema);
