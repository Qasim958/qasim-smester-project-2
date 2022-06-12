import { messageBox } from "./message.js";


export const validateHomeBannerImageForm = (
  imageUrl,
  imageUrlMsgId,
  imageAltText,
  imageAltTextId) =>{

    if (!validateValueLng(imageUrl, 4)) {
      messageBox("Product image not selected", imageUrlMsgId, "red");
      return false;
    } else {
      // messageBox(" ", imageUrlMsgId, "green");
    }

    if(!validateValueLng(imageAltText, 4)){
      messageBox("Alt text is required and should more than 4 characters", imageAltTextId, "red")
      return false;
    }else{
      // messageBox(" ", imageAltTextId, "green");
    }
    
  return true;
}
export const validateProductForm = (
  title,
  titleMsgId,
  description,
  descriptionMsgId,
  price,
  priceMsgId,
  imageUrl,
  imageUrlMsgId,
  featured,featuredMsgId) =>{
  if (!validateValueLng(title, 5)) {
    messageBox("Title Should be 5 characters Long", titleMsgId, "red");
    return false;
  } else {
    messageBox(" ", titleMsgId, "green");
  }
  if (!validateValueLng(description, 20)) {
    messageBox("Product description should be more than 20 characters", descriptionMsgId, "red");
    return false;
  } else {
    messageBox(" ", descriptionMsgId, "green");
  }
  if (!validateValueLng(price, 0)) {
    messageBox("Price should be greater than 0", priceMsgId, "red");
    return false;
  } else {
    messageBox(" ", priceMsgId, "green");
  }
  if (!validateValueLng(imageUrl, 4)) {
    messageBox("Product image not selected", imageUrlMsgId, "red");
    return false;
  } else {
    messageBox(" ", imageUrlMsgId, "green");
  }
  
return true;
}


export const validateSigninUserForm = (email, password) => {
  if (!validatEmail(email, 0)) {
    messageBox("Enter valid email address", "emailMsg", "red");
    return false;
  } else {
    messageBox(" ", "emailMsg", "green");
  }

  if (!validateValueLng(password, 8)) {
    messageBox("Password Should be more than 8 characters", "passwordMsg", "red");
    return false;
  } else {
    messageBox(" ", "passwordMsg", "green");
  }
  return true;
};

function validatEmail(data, charLng) {
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return data.trim().length > charLng &&
    validateEmail.test(String(data).toLowerCase())
    ? true
    : false;
}

function validateValueLng(data, charLng) {
  return data.trim().length >= charLng ? true : false;
}
