export interface StubResponse {
  id: number | undefined;
  isClaimed: boolean | undefined;
  personName: string | undefined;
  representedBy: string | undefined;
  familyMemberSelfieBase64: string | undefined;
  scannedOn: Date | undefined;
  scannedBy: string | undefined;
  eventName: string | undefined;
  stubScannedOn: Date | undefined;
  stubScannedBy: string | undefined;
  logCount: number | undefined;
}
