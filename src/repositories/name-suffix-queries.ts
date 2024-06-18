import { NameSuffixEnd } from '../endpoints';
import NameSuffix from '../models/entities/NameSuffix';
import { httpGet } from './base';

export async function getNameSuffixes(): Promise<NameSuffix[] | undefined> {
  return await httpGet(NameSuffixEnd.GetList);
}
