import {
  HOME_HEADER_KEY,
  PRODUCTS_STORAGE_KEY,
  USER_CART_PRODUCTS_KEY,
  USER_WISHLIST_PRODUCTS_KEY,
} from "../api/index.js";

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getfromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// SET Products to Local Storage
export function setProductsToLocalStorage(PRODUCTS) {
  return saveToLocalStorage(PRODUCTS_STORAGE_KEY, PRODUCTS);
}
// get Products From Local Storage
export function getProductsFromLocalStorage() {
  return getfromLocalStorage(PRODUCTS_STORAGE_KEY);
}

// SET HOME HEADER Storage
export function setHomeHeaderToLocalStorage(value) {
  saveToLocalStorage(HOME_HEADER_KEY, value);
}
// get HOME HEADER FROM Local Storage
export function getHomeHeaderFromLocalStorage() {
  return getfromLocalStorage(HOME_HEADER_KEY);
}

// Add Product TO CART Storage
export function setUserCartToLocalStorage(value) {
  saveToLocalStorage(USER_CART_PRODUCTS_KEY, value);
}
// get PRODUCTS FROM Local Storage
export function getUserCartFromLocalStorage() {
  return getfromLocalStorage(USER_CART_PRODUCTS_KEY);
}

// Add Product TO Wish List Storage
export function setUserWishListToLocalStorage(value) {
  saveToLocalStorage(USER_WISHLIST_PRODUCTS_KEY, value);
}
// get WishList FROM Local Storage
export function getUserWishListFromLocalStorage() {
  return getfromLocalStorage(USER_WISHLIST_PRODUCTS_KEY);
}
