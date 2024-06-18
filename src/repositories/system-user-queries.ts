import { SystemUserEnd } from '../endpoints';
import SystemUser from '../models/entities/SystemUser';
import { httpGet } from './base';

export async function getData(): Promise<SystemUser | undefined> {
  return await httpGet<SystemUser>(SystemUserEnd.GetData);
}
