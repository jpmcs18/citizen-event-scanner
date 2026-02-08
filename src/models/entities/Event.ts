export default interface Event {
  id: number;
  isProgram: boolean;
  description: string | undefined;
  fundSourceId: number | undefined;
  isTargetIndividualBenefeciaries: boolean;
  file: string | undefined;
  targetStartDate: Date | undefined;
  targetEndDate: Date | undefined;
  attendanceScan: boolean;
  claimScan: boolean;
  isWithConfirmation: boolean | undefined;
  scanningTypeId: number | undefined;
  checkAppointment: boolean | undefined;
}
