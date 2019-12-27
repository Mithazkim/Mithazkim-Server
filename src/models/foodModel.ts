import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IFood {
  name: string;
  berakhahId: string;
  active?: boolean;
  suggested?: boolean;
}

export interface IFoodDocument extends Document, IFood {}

export const foodSchema = new Schema({
  name: { type: String, required: [true, 'err_food_name_required'], trim: true, unique: true },
  berakhahId: {
    type: Schema.Types.ObjectId,
    required: [true, 'err_food_berakhahId_required'],
    ref: Consts.db.berakhotTableName
  },
  active: { type: Boolean, default: false },
  suggested: { type: Boolean, default: false }
});

const Food = model<IFoodDocument>(Consts.db.foodTableName, foodSchema, Consts.db.foodTableName);

export default Food;
