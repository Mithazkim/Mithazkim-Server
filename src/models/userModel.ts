import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {}

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: [true, 'err_username_required'], trim: true },
  password: { type: String, required: [true, 'err_password_required'], trim: true }
});

const User = model<IUserDocument>(Consts.db.userTableName, UserSchema, Consts.db.userTableName);

export default User;
