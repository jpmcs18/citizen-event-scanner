import { PersonEnd } from '../endpoints';
import Person from '../models/entities/Person';
import { httpPost } from './base';

export async function scanPersonQRCode(
  qrCode: string
): Promise<Person | undefined> {
  return httpPost(PersonEnd.Scan, { qrCode });
}
