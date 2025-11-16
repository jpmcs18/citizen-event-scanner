import { EventEnd } from '../endpoints';
import Event from '../models/entities/Event';
import Stub from '../models/entities/Stub';
import EventPerson from '../models/response-model/EventPerson';
import { httpGet, httpPost } from './base';

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

export async function printStub(
  eventClaimId: number
): Promise<Stub | undefined> {
  return httpGet(EventEnd.PrintStub + '/' + eventClaimId);
}

export async function getScannerLogCount(
  scannerId: number,
  eventId: number
): Promise<number | undefined> {
  return httpGet(
    EventEnd.GetScannerLogCount + `?scannerId=${scannerId}&eventId=${eventId}`
  );
}
