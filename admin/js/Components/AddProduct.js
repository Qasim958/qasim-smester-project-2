import { PRODUCTS_API } from "../api/index.js";
import { getUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";
import { getFormFieldsData } from "../utilities/getformData.js";
import { messageBox } from "../utilities/message.js";
import { validateProductForm } from "../utilities/validation.js";
export function AddProduct() {
  const addFormBtn = document.getElementById("addProductForm");
  addFormBtn.addEventListener("submit", addProduct);
}

async function addProduct() {
  event.preventDefault();
  let title = getFormFieldsData("addProductTitle");
  let price = getFormFieldsData("addProductPrice");
  let imageUrl = getFormFieldsData("addProductImageUrl");
  let description = getFormFieldsData("addProductDescription");
  let featured = document.getElementById("addProductFeatured").checked
    ? true
    : false;
const AUTH_TOKEN = await getUserAuthTokenFromLocalStorage()
  if (
    validateProductForm(
      title,
      "addProductTitleMsg",
      description,
      "addProductDescriptionMsg",
      price,
      "addProductPriceMsg",
      imageUrl,
      "addProductImageUrlMsg"
    )
  ) {
    addNewProduct(title, price, imageUrl, description, featured, AUTH_TOKEN);
  }
}
const addNewProduct = async (
  title,
  price,
  image_url,
  description,
  featured,
  AUTH_TOKEN
) => {
  event.preventDefault();
  try {
    const data = {
      title,
      description,
      price,
      // "image": files[0],
      image_url,
      featured,
    };
    const response = await fetch(`${PRODUCTS_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "*",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    if (Object.keys(result).length > 0) {
      messageBox("Product Added Successfully", "addProductMsg", "green");
    }else{
      messageBox("Something Went Wrong", "addProductMsg", "red");
    }
  } catch (error) {}
};
