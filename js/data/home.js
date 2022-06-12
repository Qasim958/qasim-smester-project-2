import { getApiData } from "./../settings/fetchApiData.js";
import { HOME_HEADER_API} from "../api/index.js";
import {
  getHomeHeaderFromLocalStorage,
  setHomeHeaderToLocalStorage,
} from "./../settings/localStorage.js";

let HOME_HEADER = {};

export async function getHomeHeader() {
  HOME_HEADER = await getHomeHeaderFromLocalStorage();

  if (!HOME_HEADER || HOME_HEADER == null) {
    await setHomeHeader();
  }
  return HOME_HEADER;
}

export async function setHomeHeader() {
  let data = await getApiData(HOME_HEADER_API);

  HOME_HEADER = {
    data,
  };
  setHomeHeaderToLocalStorage(HOME_HEADER);
}


