import Sex from './Sex';
import Barangay from './Barangay';

export default interface Client {
  id: number;
  firstName: string;
  middleName: string;
  lastname: string;
  nameExtension: string;
  fullName: string;
  informalFullName: string;
  middleInitials: string;
  birthDate: Date;
  sexId: number;
  barangayId: number;
  mobileNumber: string;

  sex?: Sex;
  barangay?: Barangay;
}
