import { PRODUCTS_API } from "../api/index.js";
import { getProducts } from "../data/products.js";
import { getUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";
import { getFormFieldsData } from "../utilities/getformData.js";
import { messageBox } from "../utilities/message.js";
import { validateProductForm } from "../utilities/validation.js";


let editProductId= 0;
export async function EditProduct() {
  editProductId = new URLSearchParams(window.location.search).get("id");
  if (editProductId <= 0 || editProductId == undefined) {
    location.replace("index.html");
  }
  
  const data = await getProducts();
  await setEditFormValues(data, editProductId);

  const editFormBtn = document.getElementById("editProductForm");
  editFormBtn.addEventListener("submit", editProduct);
}
async function setEditFormValues(data, editProductId) {
  const titleInput = document.getElementById("editProductTitle");
  const priceInput = document.getElementById("editProductPrice");
  const imageUrlInput = document.getElementById("editProductImageUrl");
  const descriptionInput = document.getElementById("editProductDescription");
  const featuredInput = document.getElementById("editProductFeatured");

  data.map((v) => {
    if(v.id == editProductId){
      titleInput.value = `${v.title}`;
      priceInput.value = `${v.price}`;
      imageUrlInput.value = `${v.image_url}`;
      descriptionInput.value = `${v.description}`;
      if(v.featured){
        featuredInput.checked = true;
      }else{
        featuredInput.checked = false
      }
    }
  })
}
async function editProduct() {
  event.preventDefault();

  let title = getFormFieldsData("editProductTitle");
  let price = getFormFieldsData("editProductPrice");
  let imageUrl = getFormFieldsData("editProductImageUrl");
  let description = getFormFieldsData("editProductDescription");
  let featured = document.getElementById("editProductFeatured").checked
    ? true
    : false;
  const TOKEN = await getUserAuthTokenFromLocalStorage();

  if (
    validateProductForm(
      title,
      "editProductTitleMsg",
      description,
      "editProductDescriptionMsg",
      price,
      "editProductPriceMsg",
      imageUrl,
      "editProductImageUrlMsg"
    )
  ) {
    updateProduct(editProductId, title, price, imageUrl, description, featured, TOKEN);
  }
}
const updateProduct = async (
  id,
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
    const response = await fetch(`${PRODUCTS_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Origin: "*",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
   
    if (Object.keys(result).length > 0) {
      messageBox("Product Updated Successfully", "editProductMsg", "green");
    }else{
      messageBox("Something Went Wrong", "editProductMsg", "red");
    }
  } catch (error) {}
};

