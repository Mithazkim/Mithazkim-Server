import { Document, model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {}

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true }
});

const User = model<IUserDocument>('User', UserSchema);

export default User;
