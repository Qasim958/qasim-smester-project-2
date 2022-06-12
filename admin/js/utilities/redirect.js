import { checkSession } from "./checkSession.js";

export async  function Redirect(url){

const isLoggedIn = await checkSession();
if (!isLoggedIn) {
  location.href = url;
}
}
