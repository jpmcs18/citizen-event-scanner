import { EventAttendanceEnd } from '../endpoints';
import { httpPost } from './base';

export async function saveAttendance(
  personId: number,
  eventId: number,
  image: string,
  approverId: number | undefined,
  representedBy: number | undefined,
  officeId: number | undefined,
  purpose: string | undefined
): Promise<boolean | undefined> {
  return await httpPost(EventAttendanceEnd.Save, {
    personId,
    eventId,
    image,
    approverId,
    representedBy,
    officeId,
    purpose,
  });
}
