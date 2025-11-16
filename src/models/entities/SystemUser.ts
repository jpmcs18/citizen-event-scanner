import Employee from './Employee';
import SystemUserType from './SystemUserType';
import UserAccess from './UserAccess';

export default interface SystemUser {
  id: number;
  username: string | undefined;
  isActive: boolean;
  displayName: string;
  employeeId: number | undefined;
  userTypeId: number | undefined;
  allowScanner: boolean | undefined;

  allowScanClaim: boolean | undefined;
  allowReprintStub: boolean | undefined;
  allowScanAttendance: boolean | undefined;
  allowScanStub: boolean | undefined;

  allowVerificationScanner: boolean | undefined;
  allowAttendanceScanner: boolean | undefined;
  userType?: SystemUserType;
  employee?: Employee;
  userAccesses?: UserAccess[];
}
