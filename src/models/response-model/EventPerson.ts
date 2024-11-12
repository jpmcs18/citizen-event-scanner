export default interface EventPerson {
  id: number;
  verificationStatusId: number | undefined;
  fullName: string;
  selfieBase64: string | undefined;
  isInTheList: boolean | undefined;
  isAttendanceScanned: boolean;
  isClaimScanned: boolean;
  isHasFamily: boolean | undefined;
  familyMemberClaim: string | undefined;
  familyMemberAttendance: string | undefined;
  attendanceRepresentative: string | undefined;
  claimRepresentative: string | undefined;
}
