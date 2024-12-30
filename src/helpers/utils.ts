import { jwtDecode } from 'jwt-decode';
import {ErrorObject, JwtPayload} from '../types/helpers/utilsType';
import {format} from "date-fns";

export const getItemFromStore = (key: string, defaultValue: string, store = localStorage) => {
  try {
    return store.getItem(key) === null
      ? defaultValue
      : JSON.parse(<string>store.getItem(key));
  } catch (err) {
    console.error(err);
    return store.getItem(key) || defaultValue;
  }
};

export const setItemInStore = (key: string, value: string, store = localStorage) => {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const isTokenValid = (token: string | undefined): boolean => {
  if (!token) return false;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const formatDateTime = (date: string): string => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm:ss a');
};

export const formatErrorMessage = (error: ErrorObject[]): string => {
  return error.map((err) => `${err.path}: ${err.msg}`).join(', ');
}
