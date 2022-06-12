import { clearUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";

clearUserAuthTokenFromLocalStorage();
location.replace("signin.html")