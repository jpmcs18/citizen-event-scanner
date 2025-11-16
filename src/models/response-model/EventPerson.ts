export default interface EventPerson {
  id: number;
  verificationStatusId: number | undefined;
  fullName: string;
  barangay: string | undefined;
  selfieBase64: string | undefined;
  isInTheList: boolean | undefined;
  isAttendanceScanned: boolean;
  isClaimScanned: boolean;
  isHasFamily: boolean | undefined;
  isFamilyConfirmed: boolean | undefined;
  appointmentDate: Date | undefined;
  appointmentType: string | undefined;
  checkAppointment: boolean | undefined;
  familyMemberClaim: string | undefined;
  familyMemberAttendance: string | undefined;
  familyMemberSelfieBase64: string | undefined;
  attendanceRepresentative: string | undefined;
  claimRepresentative: string | undefined;
  attendanceDate: Date | undefined;
  claimDate: Date | undefined;
  isScheduledBarangay: boolean | undefined;
  hasIn: boolean | undefined;
  eventClaimId: number | undefined;
}
