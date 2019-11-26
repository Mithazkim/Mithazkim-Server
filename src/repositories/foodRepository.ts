import Food, { IFood } from '../models/foodModel';

export function getFood() {
  return Food.find();
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
