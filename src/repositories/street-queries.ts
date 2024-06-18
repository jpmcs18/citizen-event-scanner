import { StreetEnd } from '../endpoints';
import Street from '../models/entities/Street';
import { httpGet } from './base';

export async function getStreets(): Promise<Street[] | undefined> {
  return await httpGet(StreetEnd.GetList);
}
