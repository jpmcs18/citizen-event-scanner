import { RoleEnd } from '../endpoints';
import Role from '../models/entities/Role';
import { httpGet } from './base';

export async function getRoles(): Promise<Role[] | undefined> {
  return await httpGet(RoleEnd.GetList);
}
