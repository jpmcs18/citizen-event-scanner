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
