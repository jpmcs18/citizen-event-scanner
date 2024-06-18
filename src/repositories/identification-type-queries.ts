import IdentificationType from '../models/entities/IdentificationType';
import { httpGet } from './base';
import { IdentificationTypeEnd } from '../endpoints';

export async function getIdentificationTypes(): Promise<
  IdentificationType[] | undefined
> {
  return await httpGet(IdentificationTypeEnd.GetList);
}
