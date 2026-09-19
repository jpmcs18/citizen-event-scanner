import axios, { AxiosRequestConfig } from 'axios';
import { getConfig } from '../config';
import { SecurityEnd } from '../endpoints';
import TokenData from '../models/entities/TokenData';
import { getToken, saveToken } from './session-managers';
import * as CryptoJS from 'crypto-js';

export async function httpGet<Return>(
  url: string,
): Promise<Return | undefined> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === null) {
    throw new Error('Unauthorized');
  }
  return await axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      if (res.status === 204) {
        return undefined;
      }
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpGet<Return>(url);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpGet_unauthorize<Return>(
  url: string,
): Promise<Return | undefined> {
  const requestId = generateRandomKey();
  return await axios
    .get(url, {
      headers: {
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        throw new Error(err.response.data);
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpPost<Return>(
  url: string,
  param?: any,
): Promise<Return | undefined> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === undefined) {
    throw new Error('Unauthorized');
  }
  return await axios
    .post(url, param, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      console.log(err.response);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpPost<Return>(url, param);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpPost_unauthorize<Return>(
  url: string,
  param: any,
): Promise<Return | boolean | undefined> {
  const requestId = generateRandomKey();
  return await axios
    .post(url, param, {
      headers: {
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        throw new Error(err.response.data);
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpPostMultiPart<Return>(
  url: string,
  param: FormData,
): Promise<Return | boolean | undefined> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === undefined) {
    throw new Error('Unauthorized');
  }
  return await axios
    .post(url, param, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'multipart/form-data',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpPost<Return>(url, param);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpPutMultiPart<Return>(
  url: string,
  param: FormData,
): Promise<Return | undefined> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === undefined) {
    throw new Error('Unauthorized');
  }
  return await axios
    .put(url, param, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'multipart/form-data',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpPost<Return>(url, param);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpPut(url: string, param?: any): Promise<boolean> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === undefined) {
    throw new Error('Unauthorized');
  }
  return await axios
    .put(url, param, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(() => {
      return true;
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpPut(url, param);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpDelete(url: string): Promise<boolean> {
  const token = getToken();
  const requestId = generateRandomKey();
  if (token?.token === undefined) {
    throw new Error('Unauthorized');
  }
  return await axios
    .delete(url, {
      headers: {
        Authorization: 'Bearer ' + token?.token,
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(() => {
      return true;
    })
    .catch(async (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            if (await refreshTokenAuthentication()) {
              return await httpDelete(url);
            }
            throw new Error('Unauthorized');
          default:
            throw new Error(err.response.data);
        }
      }
      throw new Error('Unknown error occurred');
    });
}

export async function httpAuthenticatingPost<Return>(
  url: string,
  param: any,
): Promise<Return | undefined> {
  const requestId = generateRandomKey();
  return await axios
    .post(url, JSON.stringify(param), {
      headers: {
        'content-type': 'application/json',
        RequestUniqueKey: requestId,
      },
      baseURL: getConfig().api,
    } as AxiosRequestConfig)
    .then(async (res) => {
      return await decryptResponse<Return>(res.data, requestId);
    })
    .catch(async (err) => {
      if (err.response) {
        throw new Error(err.response.data);
      }
      throw new Error('Unknown error occurred');
    });
}

export async function refreshTokenAuthentication(): Promise<
  boolean | undefined
> {
  const request = getToken();
  return await httpAuthenticatingPost<TokenData>(SecurityEnd.Refresh, request)
    .then((res) => {
      if (res) {
        saveToken(res);
        return true;
      }
      throw new Error('Unauthorized');
    })
    .catch(() => {
      throw new Error('Unauthorized');
    });
}

async function decryptResponse<Return>(
  encryptedText: string,
  requestUniqueKey: string,
): Promise<Return> {
  const raw = CryptoJS.enc.Base64.parse(encryptedText);

  // Extract IV (first 16 bytes) and ciphertext (rest)
  const ivBytes = CryptoJS.lib.WordArray.create(
    raw.words.slice(0, 4),
    16, // 16 bytes = 4 words
  );
  const cipherBytes = CryptoJS.lib.WordArray.create(
    raw.words.slice(4),
    raw.sigBytes - 16,
  );

  const keyWordArray = CryptoJS.enc.Utf8.parse(requestUniqueKey.toUpperCase());

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: cipherBytes } as any,
    keyWordArray,
    {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  return JSON.parse(
    decrypted.toString(CryptoJS.enc.Utf8).replace(/^\uFEFF/, ''),
  );
}

function generateRandomKey(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
