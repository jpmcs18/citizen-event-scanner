export default interface EventPerson {
  id: number;
  fullName: string;
  selfieBase64: string | undefined;
  isInTheList: boolean | undefined;
  isAttendanceScanned: boolean;
  isClaimScanned: boolean;
  isHasFamily: boolean | undefined;
  familyMemberClaim: string | undefined;
  familyMemberAttendance: string | undefined;
}
