import { categoryMitzvaRepository } from '../repositories';
import { ICategoryMitzva } from './../models/categoryMitzvaModel';

export function getCategories() {
  return categoryMitzvaRepository.getCategories();
}

export function getCategoryById(id: string) {
  return categoryMitzvaRepository.getCategoryById(id);
}

export function createCategory(category: ICategoryMitzva) {
  return categoryMitzvaRepository.createCategory(category);
}

export function updateCategory(id: string, category: ICategoryMitzva) {
  return categoryMitzvaRepository.updateCategory(id, category);
}

export function deleteCategory(id: string) {
  return categoryMitzvaRepository.deleteCategory(id);
}
