import Berakhah, { IBerakhah } from '../models/berakhahModel';

export function getBerakhot() {
  return Berakhah.find();
}

export function getBerakhahById(id: string) {
  return Berakhah.findById(id);
}

export function createBerakhah(berakhah: IBerakhah) {
  return Berakhah.create(berakhah);
}

export function updateBerakhah(id: string, berakhah: IBerakhah) {
  return Berakhah.findByIdAndUpdate(id, berakhah, { new: true, runValidators: true });
}

export function deleteBerakhah(id: string) {
  return Berakhah.findByIdAndDelete(id);
}
