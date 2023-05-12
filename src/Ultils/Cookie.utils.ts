import Cookies from "universal-cookie";
import CONSTANTS from "../../src/contants/index";
const { COOKIE_KEYS } = CONSTANTS;

const cookies = new Cookies();

const saveLocale = (locale) => {
  localStorage.setItem(COOKIE_KEYS.LOCALE, JSON.stringify(locale));
};

const getSavedLocale = () => {
  const locale = localStorage.getItem(COOKIE_KEYS.LOCALE);
  if (locale) return JSON.parse(locale);
  return "en";
};

const saveToken = (token) => {
  cookies.set(COOKIE_KEYS.SAVED_SECURE_TOKEN, token, { path: "/" });
};

const getSavedToken = () => {
  const token = cookies.get(COOKIE_KEYS.SAVED_SECURE_TOKEN);
  return token;
};

const saveFullName = (name) => {
  cookies.set(COOKIE_KEYS.SAVED_FULL_NAME, name);
};

const getFullName = () => {
  const name = cookies.get(COOKIE_KEYS.SAVED_FULL_NAME);
  return name;
};

const getSavedUserData = () => {
  const userData = localStorage.getItem(COOKIE_KEYS.SAVED_USER_DATA);
  if (userData) return JSON.parse(userData);
  return null;
};

const saveUserData = (userData) => {
  localStorage.setItem(COOKIE_KEYS.SAVED_USER_DATA, JSON.stringify(userData));
};

const clearAllSavedData = async () => {
  cookies.remove(COOKIE_KEYS.SAVED_SECURE_TOKEN);
  cookies.remove(COOKIE_KEYS.SAVED_FULL_NAME);
  localStorage.removeItem(COOKIE_KEYS.SAVED_USER_DATA);
};

const saveWidth = (width) => {
  cookies.set(COOKIE_KEYS.SAVED_WIDTH, width);
};
const getWidth = () => {
  const width = cookies.get(COOKIE_KEYS.SAVED_WIDTH) || 450;
  return parseInt(width);
};

export {
  saveToken,
  getSavedToken,
  saveFullName,
  getFullName,
  clearAllSavedData,
  saveUserData,
  getSavedUserData,
  saveLocale,
  getSavedLocale,
  saveWidth,
  getWidth,
};
