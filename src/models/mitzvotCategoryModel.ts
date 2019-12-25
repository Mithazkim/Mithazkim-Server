import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IMitzvotCategory {
  title: string;
}

export interface IMitzvotCategoryDocument extends Document, IMitzvotCategory {}

export const mitzvotCategorySchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true }
});

const MitzvotCategory = model<IMitzvotCategoryDocument>(
  Consts.db.mitzvotCategoriesTableName,
  mitzvotCategorySchema,
  Consts.db.mitzvotCategoriesTableName
);

export default MitzvotCategory;
