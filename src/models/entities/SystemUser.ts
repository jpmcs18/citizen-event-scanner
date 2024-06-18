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

  userType?: SystemUserType;
  employee?: Employee;
  userAccesses?: UserAccess[];
}
