import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IFood {
  name: string;
  berakhahId: string;
  active?: boolean;
  suggested?: boolean;
  rank?: number;
}

export interface IFoodDocument extends Document, IFood {}

export const foodSchema = new Schema<IFoodDocument>({
  name: { type: String, required: [true, Errors.FoodNameRequired], trim: true, unique: true },
  berakhahId: {
    type: Schema.Types.ObjectId,
    required: [true, Errors.FoodBerakhahIdRequired],
    ref: Consts.db.berakhotTableName
  },
  active: { type: Boolean, default: false },
  suggested: { type: Boolean, default: false },
  rank: Number
});

const Food = model<IFoodDocument>(Consts.db.foodTableName, foodSchema, Consts.db.foodTableName);

export default Food;
