import { EventEnd } from '../endpoints';
import Event from '../models/entities/Event';
import EventPerson from '../models/response-model/EventPerson';
import { httpPost } from './base';

export async function scanEventQRCode(
  qrCode: string
): Promise<Event | undefined> {
  return await httpPost(EventEnd.ScanQRCode, { qrCode });
}

export async function scanEventPersonQRCode(
  qrCode: string,
  eventId: number
): Promise<EventPerson | undefined> {
  return httpPost(EventEnd.ScanPersonQRCode, { qrCode, eventId });
}
