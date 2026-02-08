import { StubEnd } from '../endpoints';
import { StubResponse } from '../models/entities/StubResponse';
import { httpPost, httpPut } from './base';

export async function scanStubQRCode(
  qrCode: string,
  eventId: number
): Promise<
  | {
      stub: StubResponse;
      alreadyScan: boolean;
      remainingInventory: number;
      totalScan: number;
    }
  | undefined
> {
  return await httpPost(StubEnd.ScanQRCode, { qrCode, eventId });
}
export async function claimStub(
  id: number,
  logCount: number
): Promise<boolean> {
  return await httpPut(StubEnd.Claim + '/' + id, { logCount });
}
