import Food, { IFood } from '../models/foodModel';

export function getFood(search: string, startIndex: number, limit: number) {
  const aggregations = [];

  if (search) {
    aggregations.push(
      { $match: { name: { $regex: search } } },
      { $addFields: { score: { $indexOfCP: ['$name', search] } } },
      { $sort: { score: 1 } },
      { $unset: ['score'] }
    );
  }
  if (limit) {
    aggregations.push({ $skip: startIndex || 0 }, { $limit: limit });
  }

  return aggregations.length === 0 ? Food.find() : Food.aggregate(aggregations);
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

export function updateRank(id: string, quantity: number) {
  return Food.findByIdAndUpdate(id, { $inc: { rank: quantity } });
}

export function deleteFood(id: string) {
  return Food.findByIdAndDelete(id);
}

export function getFoodCount(search?: string) {
  const condition = search ? { name: { $regex: search } } : null;

  return Food.countDocuments(condition);
}
