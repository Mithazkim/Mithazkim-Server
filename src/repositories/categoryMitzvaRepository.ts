import CategoryMitzva, { ICategoryMitzva } from '../models/categoryMitzvaModel';

export function getCategories() {
  return CategoryMitzva.find();
}

export function getCategoryById(id: string) {
  return CategoryMitzva.findById(id);
}

export function createCategory(category: ICategoryMitzva) {
  return CategoryMitzva.create(category);
}

export function updateCategory(id: string, category: ICategoryMitzva) {
  return CategoryMitzva.findByIdAndUpdate(id, category, { new: true, runValidators: true });
}

export function deleteCategory(id: string) {
  return CategoryMitzva.findByIdAndDelete(id);
}
