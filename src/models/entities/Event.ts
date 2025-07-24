import EventApprover from './EventApprover';
import EventResponsibleOffice from './EventResponsibleOffice';
import EventScanningType from './EventScanningType';
import EventSponsor from './EventSponsor';
import FundSource from './FundSource';

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
  eventScanningType?: EventScanningType;
  fundSource?: FundSource;
  eventSponsors?: EventSponsor[];
  eventResponsibleOffices?: EventResponsibleOffice[];
  eventApprovers?: EventApprover[];

  qrCodeBase64?: string;
}
