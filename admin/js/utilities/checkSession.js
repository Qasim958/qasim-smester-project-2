import { getUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";
export async function checkSession() {
    let isLoggedIn = await getUserAuthTokenFromLocalStorage();
    return isLoggedIn;
}
