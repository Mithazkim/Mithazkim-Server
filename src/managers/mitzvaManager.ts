import { mitzvaRepository } from '../repositories';
import { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import Consts from '../utils/consts';

export async function getMitzvot(
  search?: string,
  page?: string,
  limit?: string
): Promise<[number, IMitzvaDocument[] | string]> {
  const total = await mitzvaRepository.getTotalMitzvotCount(search);
  const pageInt = parseInt(page, 10) || Consts.page;
  const limitInt = parseInt(limit, 10) || Consts.limit;
  const startIndex = (pageInt - 1) * limitInt;
  const endIndex = pageInt * limitInt;

  if (endIndex - limitInt > total) {
    return [total, 'limit greater then total'];
  }

  const res = await mitzvaRepository.getMitzvot(search, startIndex, limitInt);
  return [total, res];
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
