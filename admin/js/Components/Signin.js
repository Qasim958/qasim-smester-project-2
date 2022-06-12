import { validateSigninUserForm } from "../utilities/validation.js";
import { getFormFieldsData } from "../utilities/getformData.js";
import { SIGNIN_USER_API } from "../api/index.js";
import { messageBox } from "../utilities/message.js";
import {
  getUserAuthTokenFromLocalStorage,
  setUserAuthTokenToLocalStorage,
} from "../settings/localStorage.js";

export function Signin() {
  document.getElementById("signin").addEventListener("submit", signinUser);
}

async function signinUser() {
  event.preventDefault();
  let email = getFormFieldsData("email");
  let password = getFormFieldsData("password");

  if (validateSigninUserForm(email, password)) {
    const result = await validateUserSigninCredential(email, password);
console.log(result);
    if (result) {
      if (getUserAuthTokenFromLocalStorage()) {
        location.href = "index.html";
      }
    } else {
      messageBox("Email or Password is incorrect", "signinMsg", "red");
    }
  }
}

async function validateUserSigninCredential(email, password) {
  try {
    messageBox("Loading", "signinMsg", "green");
    
    const response = await fetch(SIGNIN_USER_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password: password.trim(),
      }),
    });
    const result = await response.json();
  
    if (result.error == undefined ) {
      setUserAuthTokenToLocalStorage(result.jwt);
      return true;
    }
  } catch (error) {
    messageBox("Email or Password is incorrect", "signinMsg", "red");
  }

  return false;
}
