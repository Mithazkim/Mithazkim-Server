import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import Errors from '../utils/error-messages';

export interface IBerakhah {
  shortName?: string;
  fullName: string;
}

export interface IBerakhahDocument extends Document, IBerakhah {}

export const berakhahSchema = new Schema({
  shortName: { type: String, trim: [true, Errors.BerakhahShortNameRequired], unique: true },
  fullName: { type: String, required: [true, Errors.BerakhahFullNameRequired], trim: true, unique: true }
});

const Berakhah = model<IBerakhahDocument>(Consts.db.berakhotTableName, berakhahSchema, Consts.db.berakhotTableName);

export default Berakhah;
