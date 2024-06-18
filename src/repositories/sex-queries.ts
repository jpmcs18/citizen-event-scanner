import { SexEnd } from '../endpoints';
import Sex from '../models/entities/Sex';
import { httpGet } from './base';

export async function getSexes(): Promise<Sex[] | undefined> {
  return await httpGet(SexEnd.GetList);
}
