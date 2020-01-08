import Mitzva, { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { DocumentQuery } from 'mongoose';

export function getMitzvot(search: string, startIndex: number, limit: number) {
  let query: DocumentQuery<IMitzvaDocument[], IMitzvaDocument, {}>;

  const condition = search ? { title: { $regex: search } } : null;
  query = Mitzva.find(condition);

  if (limit) {
    query = query.skip(startIndex || 0).limit(limit);
  }

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
  const condition = search ? { title: { $regex: search } } : null;
  return Mitzva.countDocuments(condition);
}
