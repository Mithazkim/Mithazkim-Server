import Mitzva, { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { DocumentQuery } from 'mongoose';

export function getMitzvot(search: string, startIndex: number, limit: number) {
  const query: DocumentQuery<IMitzvaDocument[], IMitzvaDocument, {}> = Mitzva.find(
    search ? { title: { $regex: search } } : null
  );

  if ((startIndex || startIndex === 0) && limit) {
    query.skip(startIndex).limit(limit);
  }

  return query;
}

export function getTotalMitzvotCount(search: string) {
  return Mitzva.find({ title: { $regex: search } }).countDocuments();
  //return Mitzva.countDocuments(search ? { title: { $regex: search } } : null);
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
  return Mitzva.findByIdAndUpdate(id, mitzva, { new: true, runValidators: true }, function(err) {
    console.log(err);
  });
}

export function deleteMitzva(id: string) {
  return Mitzva.findByIdAndDelete(id);
}
