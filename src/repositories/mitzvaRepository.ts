import mongoose from 'mongoose';
import Mitzva, { IMitzva } from '../models/mitzvaModel';

const splitSearch = (search: string) => search.split(' ').filter(word => word);

const getSearchMitzvotCondition = (search: string) => ({
  $or: [...splitSearch(search).map(word => ({ title: { $regex: word } })), { $text: { $search: search } }]
});

const getHasTitle = (search: string) => ({
  hasTitle: {
    $cond: [
      { $or: [...splitSearch(search).map(word => ({ $regexMatch: { input: '$title', regex: new RegExp(word) } }))] },
      true,
      false
    ]
  }
});

const getMatchCategoryId = (categoryId: string) =>
  categoryId
    ? {
        matchCategoryId: {
          $cond: [{ $eq: ['$categoryId', mongoose.Types.ObjectId(categoryId)] }, true, false]
        }
      }
    : {};

export function getMitzvot(search: string, categoryId: string, startIndex: number, limit: number) {
  const aggregations = [];
  if (search) {
    aggregations.push(
      { $match: { ...getSearchMitzvotCondition(search) } },
      { $addFields: { ...getHasTitle(search), ...getMatchCategoryId(categoryId) } },
      { $sort: { ...(categoryId && { matchCategoryId: -1 }), hasTitle: -1, score: { $meta: 'textScore' } } },
      { $unset: ['hasTitle', 'matchCategoryId'] }
    );
  } else if (categoryId) {
    aggregations.push({ $match: { categoryId: mongoose.Types.ObjectId(categoryId) } });
  }
  if (limit) {
    aggregations.push({ $skip: startIndex || 0 }, { $limit: limit });
  }

  return aggregations.length === 0 ? Mitzva.find() : Mitzva.aggregate(aggregations);
}

export function getMitzvaById(id: string) {
  return Mitzva.findById(id);
}

export function getMitzvaByTitle(title: string) {
  return Mitzva.findOne({ title });
}

export function createMitzva(mitzva: IMitzva) {
  return Mitzva.create(mitzva);
}

export function updateMitzva(id: string, mitzva: IMitzva) {
  return Mitzva.findByIdAndUpdate(id, mitzva, { new: true, runValidators: true });
}

export function updateRank(id: string, quantity: number) {
  return Mitzva.findByIdAndUpdate(id, { $inc: { rank: quantity } });
}

export function deleteMitzva(id: string) {
  return Mitzva.findByIdAndDelete(id);
}

export function getMitzvotCount(search: string, categoryId: string) {
  return Mitzva.countDocuments(
    !search && categoryId ? { categoryId } : search ? getSearchMitzvotCondition(search) : null
  );
}
