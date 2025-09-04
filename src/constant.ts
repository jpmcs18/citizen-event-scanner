import Office from './models/entities/Office';

export const API =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV
    : window.location.protocol === 'http:'
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_SECURED_PROD;
export const AppName = 'ONLINE SERVICES';
export const APP_SECRET = process.env.REACT_APP_SECRET_KEY;

export const Pages = {
  Dashboard: 'Dashboard',
  Persons: 'Persons',
};

export const events: any[] = ['Event', 'Verification', 'Attendance'];
export const offices: Office[] = [
  { id: 1, description: 'INFORMATION COMMUNICATIONS AND TECHNOLOGY OFFICE' },
  { id: 2, description: 'CITY PLANNING AND DEVELOPMENT OFFICE' },
  { id: 3, description: 'CITY SOCIAL WELFARE AND DEVELOPMENT OFFICE' },
  { id: 4, description: 'NEW OFFICE' },
  { id: 5, description: 'BARANGAY BAGUMBAYAN NORTH' },
  { id: 6, description: 'BARANGAY BAGUMBAYAN SOUTH' },
  { id: 7, description: 'BARANGAY BANGKULASI' },
  { id: 8, description: 'BARANGAY DAANGHARI' },
  { id: 9, description: 'BARANGAY NAVOTAS EAST' },
  { id: 10, description: 'BARANGAY NAVOTAS WEST' },
  { id: 11, description: 'BARANGAY NORTH BAY BOULEVARD NORTH' },
  { id: 12, description: 'BARANGAY NORTH BAY BOULEVARD SOUTH - DAGAT-DAGATAN' },
  { id: 13, description: 'BARANGAY NORTH BAY BOULEVARD SOUTH - KAUNLARAN' },
  { id: 14, description: 'BARANGAY NORTH BAY BOULEVARD SOUTH - PROPER' },
  { id: 15, description: 'BARANGAY SAN JOSE' },
  { id: 16, description: 'BARANGAY SAN ROQUE' },
  { id: 17, description: 'BARANGAY SAN RAFAEL VILLAGE' },
  { id: 18, description: 'BARANGAY SIPAC-ALMACEN' },
  { id: 19, description: 'BARANGAY TANGOS NORTH' },
  { id: 20, description: 'BARANGAY TANGOS SOUTH' },
  { id: 21, description: 'BARANGAY TANZA 1' },
  { id: 22, description: 'BARANGAY TANZA 2' },
  { id: 23, description: 'CITY GENERAL SERVICES OFFICE' },
  { id: 24, description: 'NAVOTAAS HANAPBUHAY CENTER' },
  { id: 25, description: 'NAVOSERVE' },
];
