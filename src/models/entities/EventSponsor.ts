import Sponsor from './Sponsor';

export default interface EventSponsor {
  id: number;
  eventId: number | undefined;
  sponsorId: number | undefined;

  sponsor?: Sponsor;
  tempId?: string;
}
