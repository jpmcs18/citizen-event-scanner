export default interface EventPerson {
  id: number;
  fullName: string;
  selfieBase64: string | undefined;
  isInTheList: boolean;
  isAttendanceScanned: boolean;
  isClaimScanned: boolean;
}
