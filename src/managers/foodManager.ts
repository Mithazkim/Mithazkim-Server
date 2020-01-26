import { foodRepository } from '../repositories';
import { IFood, IFoodDocument } from '../models/foodModel';
import { Errors, StartGreaterThanTotalError } from '../utils/errors';
import { getStartIndexAndLimit } from '../utils/pagination';

export async function getFood(search?: string, page?: string, limit?: string): Promise<[number, IFoodDocument[]]> {
  const total = await foodRepository.getFoodCount(search);

  const [start, skip] = getStartIndexAndLimit(page, limit);

  if (total === 0) return [0, []];

  if (start > total) throw new StartGreaterThanTotalError(Errors.StartGreaterThenTotal);

  const food = await foodRepository.getFood(search, start, skip);
  for (const item of food as IFoodDocument[]) {
    if (item.name.startsWith(search))
      if (item.name === search) {
        foodRepository.updateRank(item._id, 1).exec();
        break;
      } else continue;
    else break;
  }
  return [total, food];
}

export function getFoodById(id: string) {
  return foodRepository.getFoodById(id);
}

export function getFoodByName(name: string) {
  return foodRepository.getFoodByName(name);
}

export function createFood(Food: IFood) {
  return foodRepository.createFood(Food);
}

export function updateFood(id: string, Food: IFood) {
  return foodRepository.updateFood(id, Food);
}

export function deleteFood(id: string) {
  return foodRepository.deleteFood(id);
}
