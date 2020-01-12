import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IMitzva {
  title: string;
  why: string;
  how: string;
  categoryId: string;
  active: boolean;
  rank: number;
}

export interface IMitzvaDocument extends Document, IMitzva {}

export const mitzvaSchema = new Schema({
  title: { type: String, required: [true, 'err_mitzva_title_required'], trim: true, unique: true },
  why: { type: String, trim: true, maxlength: 1000 },
  how: { type: String, trim: true, maxlength: 1000 },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'err_mitzva_categoryId_required'],
    ref: Consts.db.mitzvotCategoriesTableName
  },
  active: { type: Boolean, default: false },
  rank: { type: Number, default: 0 }
});

mitzvaSchema.index({ how: 'text', why: 'text' });

const Mitzva = model<IMitzvaDocument>(Consts.db.mitzvotTableName, mitzvaSchema, Consts.db.mitzvotTableName);

export default Mitzva;
