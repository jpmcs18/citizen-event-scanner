import { EventClaimEnd } from '../endpoints';
import { httpPost } from './base';

export async function saveClaim(
  personId: number,
  eventId: number,
  image: string,
  sign: string,
  approverId: number | undefined,
  representedBy: number | undefined
): Promise<boolean | undefined> {
  return await httpPost(EventClaimEnd.Save, {
    personId,
    eventId,
    image,
    sign,
    approverId,
    representedBy,
  });
}
