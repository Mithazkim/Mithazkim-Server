import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IUserMetadata {
  browser?: string;
  version?: string;
  os?: string;
  platform?: string;
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
  isAndroid?: boolean;
  isiPhone?: boolean;
  isWindows?: boolean;
  isMac?: boolean;
}

export interface IUserMetadataDocument extends Document, IUserMetadata {}

export const userMetadataSchema = new Schema({
  browser: String,
  version: String,
  os: String,
  platform: String,
  isMobile: Boolean,
  isTablet: Boolean,
  isDesktop: Boolean,
  isAndroid: Boolean,
  isiPhone: Boolean,
  isWindows: Boolean,
  isMac: Boolean
});

const UserMetadata = model<IUserMetadataDocument>(
  Consts.db.userMetadataTableName,
  userMetadataSchema,
  Consts.db.userMetadataTableName
);

export default UserMetadata;
