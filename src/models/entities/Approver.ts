import Employee from './Employee';

export default interface Approver {
  id: number;
  employeeId: number;
  eventPasscode: string;
  employee?: Employee;
}
