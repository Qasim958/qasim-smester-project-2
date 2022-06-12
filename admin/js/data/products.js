import { getApiData } from "../settings/fetchApiData.js"
import { PRODUCTS_API } from "../api/index.js";
import {
  setProductsToLocalStorage,
  getProductsFromLocalStorage,
} from "./../settings/localStorage.js";

export let PRODUCTS = [];


export async function getProducts() {
  PRODUCTS = await getProductsFromLocalStorage();

  if (!PRODUCTS || PRODUCTS == null) {
    await setProducts();
  }
  return PRODUCTS;
}

export async function setProducts() {
  let data = await getApiData(PRODUCTS_API);
  if (data != null) {
    data.map(v => {
      PRODUCTS.push(v)
    })
    setProductsToLocalStorage(data);
  }
}

