import { getUserWishlist, setUserWishList } from "../data/wishList.js";
import { getProducts } from "../data/products.js";
import { toggleCartProduct } from "./Cart.js";
import { messageBox } from "../utils/message.js";
import { toggleBucketItems } from "./toggleButtonStates.js";
import { flashAlert } from "../utils/flashAlert.js";
import { toggleWishListItemIcon } from "./Home.js";
import { getUserCart } from "../data/cart.js";
import { showIcons } from "../utils/setCardIcons.js";

const productsSection = document.querySelector("main section ul");

export async function WishList() {
  const USER_CART = await getUserCart();
  let USER_WISHLIST = await getUserWishlist();
  let PRODUCTS = await getProducts();

  if (USER_WISHLIST.length) {
    showProducts(PRODUCTS,USER_CART,USER_WISHLIST);
  } else {
    messageBox("Your wishlist is empty :(", "products", "red");
  }
}

// Show Products on HTML
function showProducts(data, cart, wishlist) {
  productsSection.innerHTML = ``;

  if (wishlist) {
    data = data.filter((v1) => wishlist.some((v2) => v1.id == v2));
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
                  <button  class="fav" data-item="${v.id}"><i class="fa fa-times"></i></button>
                  <button  class="cart" data-item="${v.id}"><i class="fa fa-shopping-cart"></i></button>
                </div>
              </div>
          </li>`;
    });

    showIcons(cart, wishlist);
    toggleBucketItems("fav", `data-item`, togglefavProduct, true);
    toggleBucketItems("cart", `data-item`, toggleCartProduct, false);
  }
}

export async function togglefavProduct(product_Id, callBackToMain, iconElement) {
  let isAdded = await setUserWishList(product_Id);
  if (!isAdded) {
    flashAlert("Added to wishlist", "green")
  } else {
    flashAlert("Removed from wishlist", "red")
    
  }
  if (callBackToMain) {
    let USER_WISHLIST = await getUserWishlist();
    // let PRODUCTS = await getProducts();
    if (USER_WISHLIST.length) {
      WishList();
      // showProducts(PRODUCTS, USER_WISHLIST);
    } else {
      messageBox("Your wishlist is empty :(", "products", "red");
    }
  }else{
    toggleWishListItemIcon(iconElement)
  }
}
