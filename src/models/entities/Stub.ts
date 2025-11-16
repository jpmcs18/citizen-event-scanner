import { IfMaybeUndefined } from '@reduxjs/toolkit/dist/tsHelpers';

export default interface Stub {
  id: number;
  eventClaimId: number;
  eventName: string | undefined;
  scanClaimedOn: Date | undefined;
  scanClaimedByUser: string | undefined;
  isClaimed: boolean;
  scannedBy: number | undefined;
  scannedOn: Date | undefined;
  scannedByUser: string | undefined;
  qrCodeBase64: string | undefined;
  barangay?: string | undefined;
}
