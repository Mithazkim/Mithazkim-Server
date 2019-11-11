import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IBerakhah {
  shortName?: string;
  fullName: string;
}

export interface IBerakhahDocument extends Document, IBerakhah {}

export const berakhahSchema = new Schema({
  shortName: { type: String, trim: true, unique: true },
  fullName: { type: String, required: true, trim: true, unique: true }
});

const Berakhah = model<IBerakhahDocument>(Consts.db.berakhotTableName, berakhahSchema, Consts.db.berakhotTableName);

export default Berakhah;
