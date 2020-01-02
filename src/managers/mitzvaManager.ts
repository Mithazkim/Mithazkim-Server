import { mitzvaRepository } from '../repositories';
import { IMitzva } from '../models/mitzvaModel';

export async function getMitzvot(search?: string, page?: string, limit?: string) {
  const total = await mitzvaRepository.getTotalMitzvotCount();
  const pageInt = parseInt(page, 10) || 1;
  const limitInt = parseInt(limit, 10) || 10;
  const startIndex = (pageInt - 1) * limitInt;
  const endIndex = pageInt * limitInt;

  if (endIndex - limitInt > total) {
    return 'limit greater then total';
  }
  return mitzvaRepository.getMitzvot(search, startIndex, limitInt);
}

export function getMitzvaById(id: string) {
  return mitzvaRepository.getMitzvaById(id);
}

export function createMitzva(mitzva: IMitzva) {
  return mitzvaRepository.createMitzva(mitzva);
}

export function updateMitzva(id: string, mitzva: IMitzva) {
  return mitzvaRepository.updateMitzva(id, mitzva);
}

export function deleteMitzva(id: string) {
  return mitzvaRepository.deleteMitzva(id);
}
