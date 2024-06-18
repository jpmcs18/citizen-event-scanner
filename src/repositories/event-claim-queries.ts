import { EventClaimEnd } from '../endpoints';
import { httpPost } from './base';

export async function saveClaim(
  personId: number,
  eventId: number,
  image: string,
  approverId: number | undefined
): Promise<boolean | undefined> {
  return await httpPost(EventClaimEnd.Save, {
    personId,
    eventId,
    image,
    approverId,
  });
}
