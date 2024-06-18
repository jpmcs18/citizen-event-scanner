import Approver from './Approver';

export default interface EventApprover {
  id: number;
  eventId: number | undefined;
  approverId: number | undefined;

  approver?: Approver;
  tempId?: string;
}
