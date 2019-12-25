import { mitzvotCategoryRepository } from '../repositories';
import { IMitzvotCategory } from '../models/mitzvotCategoryModel';

export function getCategories() {
  return mitzvotCategoryRepository.getCategories();
}

export function getCategoryById(id: string) {
  return mitzvotCategoryRepository.getCategoryById(id);
}

export function createCategory(category: IMitzvotCategory) {
  return mitzvotCategoryRepository.createCategory(category);
}

export function updateCategory(id: string, category: IMitzvotCategory) {
  return mitzvotCategoryRepository.updateCategory(id, category);
}

export function deleteCategory(id: string) {
  return mitzvotCategoryRepository.deleteCategory(id);
}
