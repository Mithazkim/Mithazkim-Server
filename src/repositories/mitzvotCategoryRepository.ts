import MitzvotCategory, { IMitzvotCategory } from '../models/mitzvotCategoryModel';

export function getCategories() {
  return MitzvotCategory.find();
}

export function getCategoryById(id: string) {
  return MitzvotCategory.findById(id);
}

export function createCategory(category: IMitzvotCategory) {
  return MitzvotCategory.create(category);
}

export function updateCategory(id: string, category: IMitzvotCategory) {
  return MitzvotCategory.findByIdAndUpdate(id, category, { new: true, runValidators: true });
}

export function deleteCategory(id: string) {
  return MitzvotCategory.findByIdAndDelete(id);
}
