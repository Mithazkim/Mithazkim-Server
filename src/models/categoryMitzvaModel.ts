import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface ICategoryMitzva {
  title: string;
}

export interface ICategoryMitzvaDocument extends Document, ICategoryMitzva {}

export const categoryMitzvaSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true }
});

const CategoryMitzva = model<ICategoryMitzvaDocument>(
  Consts.db.categoriesMitzvotTableName,
  categoryMitzvaSchema,
  Consts.db.categoriesMitzvotTableName
);

export default CategoryMitzva;
