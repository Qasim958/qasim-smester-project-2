import {
  getUserWishListFromLocalStorage,
  setUserWishListToLocalStorage,
} from "./../settings/localStorage.js";

export async function getUserWishlist() {
  let WISHLIST_ITEMS = await getUserWishListFromLocalStorage();
  if (WISHLIST_ITEMS) {
    return WISHLIST_ITEMS;
  } else {
    return [];
  }
}

export async function setUserWishList(productId) {
  let ITEMS = await getUserWishlist();
  let isPresent = false;

  if (ITEMS.length) {
    ITEMS.map((v) => {
      if (v == productId) {
        isPresent = true;
      }
    });
    if (isPresent) {
      ITEMS = ITEMS.filter((v) => v != productId);
    } else {
      ITEMS.push(productId);
    }
  } else {
    ITEMS.push(productId);
  }

  // Sort the numbers in descinding order:
  ITEMS.sort(function (a, b) {
    return a - b;
  });
  setUserWishListToLocalStorage(ITEMS);
  return isPresent;
}
