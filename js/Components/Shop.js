import { getProducts } from "./../data/products.js";
import { togglefavProduct } from "./WishList.js";
import { toggleCartProduct } from "./Cart.js";
import { messageBox } from "../utils/message.js";
import { getUserWishlist } from "../data/wishList.js";
import { getUserCart } from "../data/cart.js";
import { toggleBucketItems } from "./toggleButtonStates.js";
import { showIcons } from "../utils/setCardIcons.js";

const productsSection = document.querySelector("#products");

let productsGetter;
let productsCartGetter;
let productsWishListGetter;

export async function Shop() {
  productsGetter = await getProducts();
  productsCartGetter = await getUserCart();
  productsWishListGetter = await getUserWishlist();

  showProducts(productsGetter, productsCartGetter, productsWishListGetter);

  document
    .getElementById("searchItemName")
    .addEventListener("keyup", filterProductByName);
  document
    .getElementById("searchItemPrice")
    .addEventListener("keyup", filterProductByPrice);
}

// Show Products on HTML
export function showProducts(data, cart, wishlist) {
  productsSection.innerHTML = "";
  //   displaydata
  data.map((v, i) => {
    productsSection.innerHTML += `
        <li>
            <div class="card">
              <div class="card-img">    
                <img src="${v.image_url}" alt="${v.title}" />
              </div>
              <div class="card-header">
                <h3>${v.title}</h3>             
              </div>
              <div class="card-description">
                 <span>${v.price} $</span>
              </div>
              <div class="card-footer">
                <a href="productDetail.html?id=${i}">Details</a>
                <button  class="fav" data-item="${v.id}"><i class="fa fa-heart"></i></button>
                <button  class="cart" data-item="${v.id}"><i class="fa fa-shopping-cart"></i></button>
              </div>
            </div>
        </li>`;
  });
  showIcons(cart, wishlist);
  toggleBucketItems("fav", `data-item`, togglefavProduct, false);
  toggleBucketItems("cart", `data-item`, toggleCartProduct, false);
}

async function filterProductByName(event) {
  event.preventDefault();

  try {
    let filter = await event.target.value;
    filter = filter.trim();
    filter = filter.replace(/\s+/g, "");
    filter = filter.toLowerCase();
    let data = productsGetter;

    if (data && filter) {
      let title = "";
      data = data.filter((v) => {
        title = v.title.trim();
        title = title.split(" ").join("");
        title = title.toLowerCase();
        return title.includes(filter);
      });
      // data = data.filter((v) => v.title == filter);

      if (Object.keys(data).length === 0) {
        messageBox(`No product found with this name`, "products", "red");
      } else {
        showProducts(data, productsCartGetter, productsWishListGetter);
      }
    } else {
      showProducts(data, productsCartGetter, productsWishListGetter);
    }
  } catch (error) {
    console.log(error);
  }
}

async function filterProductByPrice(event) {
  event.preventDefault();

  try {
    let filter = await event.target.value;
    filter = parseFloat(filter.trim());
    let data = await getProducts();

    if (data && filter > 0) {
      data = data.filter((v) => v.price <= filter);

      if (Object.keys(data).length === 0) {
        messageBox(`No product found in this price range`, "products", "red");
      } else {
        showProducts(data, productsCartGetter, productsWishListGetter);
      }
    } else {
      showProducts(data, productsCartGetter, productsWishListGetter);
    }
  } catch (error) {
    console.log(error);
  }
}
