import { foodRepository } from '../repositories';
import { IFood } from '../models/foodModel';

export function getFood() {
  return foodRepository.getFood();
}

export function getFoodById(id: string) {
  return foodRepository.getFoodById(id);
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
