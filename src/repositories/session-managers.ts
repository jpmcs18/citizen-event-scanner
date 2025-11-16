import { APP_SECRET } from '../constant';
import Event from '../models/entities/Event';
import SystemUser from '../models/entities/SystemUser';
import TokenData from '../models/entities/TokenData';

var CryptoJS = require('crypto-js');
const token_add = '--pxx--';
const profile_add = '--pxx-xdx--';
const event_add = '--axx-xdx--';
const theme = '--dark-theme--';
const scanner_add = '--pxx-xsx--';
const scan_log_add = '--sxx-xsx--';

function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, APP_SECRET).toString();
}
function decrypt(data: string): string {
  return CryptoJS.AES.decrypt(data, APP_SECRET).toString(CryptoJS.enc.Utf8);
}
export function getTheme(): boolean | undefined {
  try {
    return localStorage.getItem(theme) === 'true';
  } catch {
    return undefined;
  }
}
export function setTheme(isDarkMode: boolean) {
  localStorage.setItem(theme, isDarkMode.toString());
}
export function saveToken(auth: TokenData) {
  if (auth.token !== undefined && auth.refreshToken !== undefined) {
    localStorage.setItem(token_add, encrypt(JSON.stringify(auth)));
  }
}
export function clearToken() {
  localStorage.removeItem(token_add);
}
export function getToken(): TokenData | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(token_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function getSessionProfile(): SystemUser | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(profile_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function saveSessionProfile(profile: SystemUser) {
  if (profile !== undefined) {
    localStorage.setItem(profile_add, encrypt(JSON.stringify(profile)));
  }
}
export function clearSessionProfile() {
  localStorage.removeItem(profile_add);
}
export function getSessionEvent(): Event | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(event_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function saveSessionEvent(event: Event) {
  if (event !== undefined) {
    localStorage.setItem(event_add, encrypt(JSON.stringify(event)));
  }
}
export function clearSessionEvent() {
  localStorage.removeItem(event_add);
}

export function clearSession() {
  localStorage.clear();
}

export function clearScanner() {
  localStorage.removeItem(scanner_add);
}
export function getScanner(): boolean {
  return localStorage.getItem(scanner_add) === 'true';
}
export function saveScanner(isScanner: boolean) {
  localStorage.setItem(scanner_add, isScanner.toString());
}

export function getScanLog(): string | null {
  try {
    return localStorage.getItem(scan_log_add);
  } catch {
    return null;
  }
}
export function saveScanLog(log: string) {
  localStorage.setItem(scan_log_add, log);
}
