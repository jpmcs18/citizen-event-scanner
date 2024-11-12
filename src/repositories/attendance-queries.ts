import { AttendanceEnd } from '../endpoints';
import { httpPost } from './base';

export async function insertAttendance(
  personId: number,
  officeId: number
): Promise<boolean | undefined> {
  return await httpPost(AttendanceEnd.Insert, { officeId, personId });
}
