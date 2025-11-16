import { StubEnd } from '../endpoints';
import { StubResponse } from '../models/entities/StubResponse';
import { httpPost, httpPut } from './base';

export async function scanStubQRCode(
  qrCode: string
): Promise<StubResponse | undefined> {
  return await httpPost(StubEnd.ScanQRCode, { qrCode });
}
export async function claimStub(
  id: number,
  logCount: number
): Promise<boolean> {
  return await httpPut(StubEnd.Claim + '/' + id, { logCount });
}
