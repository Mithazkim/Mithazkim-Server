import { mitzvaRepository } from '../repositories';
import { IMitzva, IMitzvaDocument } from '../models/mitzvaModel';
import { StartGreaterThanTotalError } from '../utils/errors';
import { getStartIndexAndLimit } from '../utils/pagination';

export async function getMitzvot(search?: string, page?: string, limit?: string): Promise<[number, IMitzvaDocument[]]> {
  search = search?.trim();

  const total = await mitzvaRepository.getMitzvotCount(search);

  const [start, skip] = getStartIndexAndLimit(page, limit);

  if (total === 0) return [0, []];

  if (start > total) throw new StartGreaterThanTotalError('err_start_greater_than_total');

  const mitzvot = await mitzvaRepository.getMitzvot(search, start, skip);
  if (search) {
    const words = search.split(' ').filter(word => word);

    mitzvot.sort(mitzva => (words.some(word => mitzva.title.includes(word)) ? 1 : -1));
  }

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

export function deleteMitzva(id: string) {
  return mitzvaRepository.deleteMitzva(id);
}
