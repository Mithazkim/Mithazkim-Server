import Mitzva, { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { DocumentQuery } from 'mongoose';

export function getMitzvot(search: string, startIndex: number, limit: number) {
  let query: DocumentQuery<IMitzvaDocument[], IMitzvaDocument, {}>;

  if (search) {
    query.find({ title: { $regex: search } });
  }
  if (startIndex && limit) {
    query.skip(startIndex).limit(limit);
  }

  return query;
}

export function getTotalMitzvotCount() {
  return Mitzva.countDocuments();
}

export function getMitzvaById(id: string) {
  return Mitzva.findById(id);
}

export function createMitzva(mitzva: IMitzva) {
  return Mitzva.create(mitzva);
}

export function updateMitzva(id: string, mitzva: IMitzva) {
  console.log(mitzva);
  console.log(id);
  return Mitzva.findByIdAndUpdate(id, mitzva, { new: true, runValidators: true });
}

export function deleteMitzva(id: string) {
  Mitzva.findByIdAndDelete(id);
}
