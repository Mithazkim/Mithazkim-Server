import Mitzva, { IMitzva } from '../models/mitzvaModel';

function getSearchMitzvotCondition(search: string) {
  const words = search.split(' ').filter(word => word);

  return { $or: [...words.map(word => ({ title: { $regex: word } })), { $text: { $search: search } }] };
}

function getHasTitle(search: string) {
  const words = search.split(' ').filter(word => word);

  return {
    $cond: [
      { $or: [...words.map(word => ({ $regexMatch: { input: '$title', regex: new RegExp(word) } }))] },
      true,
      false
    ]
  };
}

export function getMitzvot(search: string, startIndex: number, limit: number) {
  const aggregations = [];
  if (search) {
    aggregations.push(
      { $match: { ...getSearchMitzvotCondition(search) } },
      { $addFields: { hasTitle: getHasTitle(search) } },
      { $sort: { hasTitle: -1, score: { $meta: 'textScore' } } },
      { $unset: 'hasTitle' }
    );
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

export function getMitzvotCount(search?: string) {
  return Mitzva.countDocuments(search ? getSearchMitzvotCondition(search) : null);
}
