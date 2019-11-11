import { berakhahRepository } from '../repositories';
import { IBerakhah } from '../models/berakhahModel';

export function getBerakhot() {
  return berakhahRepository.getBerakhot();
}

export function getBerakhahById(id: string) {
  return berakhahRepository.getBerakhahById(id);
}

export function createBerakhah(berakhah: IBerakhah) {
  return berakhahRepository.createBerakhah(berakhah);
}

export function updateBerakhah(id: string, berakhah: IBerakhah) {
  return berakhahRepository.updateBerakhah(id, berakhah);
}

export function deleteBerakhah(id: string) {
  return berakhahRepository.deleteBerakhah(id);
}
