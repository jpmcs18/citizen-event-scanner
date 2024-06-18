import Office from './Office';

export default interface Employee {
  id: number;
  fullName: string;
  position: string;
  officeId: number;

  office?: Office;
}
