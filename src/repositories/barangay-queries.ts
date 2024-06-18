import { BarangayEnd } from '../endpoints';
import Barangay from '../models/entities/Barangay';
import { httpGet } from './base';

export async function getBarangays(): Promise<Barangay[] | undefined> {
  return await httpGet(BarangayEnd.GetList);
}
