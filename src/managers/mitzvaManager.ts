import { mitzvaRepository } from '../repositories';
import { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { Errors, StartGreaterThanTotalError } from '../utils/errors';
import { getStartIndexAndLimit } from '../utils/pagination';

export async function getMitzvot(
  search?: string,
  categoryId?: string,
  page?: string,
  limit?: string
): Promise<[number, IMitzvaDocument[]]> {
  search = search?.trim();

  const total = await mitzvaRepository.getMitzvotCount(search, categoryId);

  const [start, skip] = getStartIndexAndLimit(page, limit);

  if (total === 0) return [0, []];

  if (start > total) throw new StartGreaterThanTotalError(Errors.StartGreaterThenTotal);

  const mitzvot = await mitzvaRepository.getMitzvot(search, categoryId, start, skip);

  return [total, mitzvot];
}

export function getMitzvaById(id: string) {
  return mitzvaRepository.getMitzvaById(id);
}

export function getMitzvaByTitle(title: string) {
  return mitzvaRepository.getMitzvaByTitle(title);
}

export function createMitzva(mitzva: IMitzva) {
  return mitzvaRepository.createMitzva(mitzva);
}

export function updateMitzva(id: string, mitzva: IMitzva) {
  return mitzvaRepository.updateMitzva(id, mitzva);
}

export function updateRank(id: string) {
  return mitzvaRepository.updateRank(id, 1);
}

export function deleteMitzva(id: string) {
  return mitzvaRepository.deleteMitzva(id);
}
