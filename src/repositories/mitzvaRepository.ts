import Mitzva, { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { DocumentQuery } from 'mongoose';

function getSearchMitzvotCondition(search: string) {
  const words = search.split(' ').filter(word => word);

  return { $or: [...words.map(word => ({ title: { $regex: word } })), { $text: { $search: search } }] };
}

export function getMitzvot(search: string, startIndex: number, limit: number) {
  let query: DocumentQuery<IMitzvaDocument[], IMitzvaDocument, {}>;

  if (search) {
    query = Mitzva.find(getSearchMitzvotCondition(search), { score: { $meta: 'textScore' } }).sort({
      score: { $meta: 'textScore' }
    });
  } else query = Mitzva.find();

  if (limit) query = query.skip(startIndex || 0).limit(limit);

  return query;
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
