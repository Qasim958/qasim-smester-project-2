import { HOME_HEADER_KEY, PRODUCTS_STORAGE_KEY, SIGNIN_USER_TOKEN_KEY } from "../api/index.js"

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getfromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function clearfromLocalStorage(key){
  localStorage.removeItem(key);
}

// SET Auth Token to Local Storage
export function setUserAuthTokenToLocalStorage(token) {
  return saveToLocalStorage(SIGNIN_USER_TOKEN_KEY, token);
}

// get Auth Token From Local Storage
export function getUserAuthTokenFromLocalStorage() {
  return getfromLocalStorage(SIGNIN_USER_TOKEN_KEY);
}

// clear Auth Token From Local Storage
export function clearUserAuthTokenFromLocalStorage() {
  return clearfromLocalStorage(SIGNIN_USER_TOKEN_KEY);
}

// SET HOME HEADER Storage
export function setHomeHeaderToLocalStorage(value) {
  saveToLocalStorage(HOME_HEADER_KEY, value);
}
// get HOME HEADER FROM Local Storage
export function getHomeHeaderFromLocalStorage() {
  return getfromLocalStorage(HOME_HEADER_KEY);
}


// SET Products to Local Storage
export function setProductsToLocalStorage(PRODUCTS) {
  return saveToLocalStorage(PRODUCTS_STORAGE_KEY, PRODUCTS);
}
// get Products From Local Storage
export function getProductsFromLocalStorage() {
  return getfromLocalStorage(PRODUCTS_STORAGE_KEY);
}
