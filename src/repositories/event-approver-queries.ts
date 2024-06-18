import { EventApproverEnd } from '../endpoints';
import { httpPost } from './base';

export async function validateApprover(
  passcode: string,
  eventId: number
): Promise<number | undefined> {
  return await httpPost(EventApproverEnd.Validate, { passcode, eventId });
}
