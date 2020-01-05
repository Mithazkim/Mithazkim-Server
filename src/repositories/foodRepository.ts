import { IFoodDocument } from './../models/foodModel';
import { DocumentQuery } from 'mongoose';
import Food, { IFood } from '../models/foodModel';

export function getFood(search: string, startIndex: number, limit: number) {
  let query: DocumentQuery<IFoodDocument[], IFoodDocument, {}>;

  const condition = search ? { name: { $regex: search } } : null;
  query = Food.find(condition);

  if (limit) {
    query = query.skip(startIndex || 0).limit(limit);
  }

  return query;
}

export function getFoodById(id: string) {
  return Food.findById(id);
}

export function getFoodByName(name: string) {
  return Food.findOne({ name });
}

export function createFood(food: IFood) {
  return Food.create(food);
}

export function updateFood(id: string, food: IFood) {
  return Food.findByIdAndUpdate(id, food, { new: true, runValidators: true });
}

export function deleteFood(id: string) {
  return Food.findByIdAndDelete(id);
}

export function getFoodCount(search?: string) {
  const condition = search ? { name: { $regex: search } } : null;

  return Food.countDocuments(condition);
}
