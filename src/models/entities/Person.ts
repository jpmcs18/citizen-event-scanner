import Barangay from './Barangay';
import CivilStatus from './CivilStatus';
import IdentificationType from './IdentificationType';
import NameSuffix from './NameSuffix';
import Role from './Role';
import Sex from './Sex';
import Street from './Street';

export default interface Person {
  id: number;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  nameSuffixId: number | undefined;
  birthDate: Date | undefined;
  sexId: number | undefined;
  civilStatusId: number;
  mobileNumber: string;
  fullName: string;
  isFamilyHead: boolean;
  verificationStatusId?: number | undefined;
  verifiedBy?: number | undefined;
  verifiedOn?: Date | undefined;
  verificationRemarks?: string | undefined;
  identificationTypeId?: number | undefined;
  crin: string;
  barangayId: number | undefined;
  street: string | undefined;
  houseNo: string | undefined;
  roleId: number | undefined;
  phase: number;
  qrCode: string | undefined;

  sex?: Sex;
  civilStatus?: CivilStatus;
  barangay?: Barangay;
  nameSuffix?: NameSuffix;
  identificationType?: IdentificationType;

  idBase64?: string;
  selfieBase64?: string;
  qrCodeBase64?: string;

  role?: Role;
}
