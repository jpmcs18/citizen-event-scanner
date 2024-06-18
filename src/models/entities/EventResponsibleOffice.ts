import Office from './Office';

export default interface EventResponsibleOffice {
  id: number;
  eventId: number | undefined;
  officeId: number | undefined;

  office?: Office;
  tempId?: string;
}
