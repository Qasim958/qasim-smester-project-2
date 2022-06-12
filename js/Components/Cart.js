// import { BASE_URL } from "../api/index.js";
import { getUserWishlist } from "../data/wishList.js";
import { flashAlert } from "../utils/flashAlert.js";
import { messageBox } from "../utils/message.js";
import { showIcons } from "../utils/setCardIcons.js";
import { getUserCart, setUserCart, updateUserCart } from "./../data/cart.js";
import { getProducts } from "./../data/products.js";
import { toggleCartItemIcon } from "./Home.js";
import {
  productQtyCalculation,
  toggleBucketItems,
} from "./toggleButtonStates.js";
import { togglefavProduct } from "./WishList.js";

const productsSection = document.querySelector("main section ul");
const totalPriceSection = document.getElementById("totalPrice");
let totalprice = 0;

export async function Cart() {
  const USER_CART = await getUserCart();
  const PRODUCTS = await getProducts();
  let USER_WISHLIST = await getUserWishlist();

  if (USER_CART.length) {
    showProducts(PRODUCTS, USER_CART, USER_WISHLIST);
  } else {
    totalprice = 0;
    totalPriceSection.innerHTML = `${totalprice}`;
    messageBox("Your cart is empty :(", "products", "red");
  }
}

export async function toggleCartProduct(
  product_Id,
  callBackToMain,
  iconElement
) {
  let isAdded = await setUserCart(product_Id, 1);
  if (!isAdded) {
    flashAlert("Added to cart", "green");
  } else {
    flashAlert("Removed from cart", "red");
  }
  if (callBackToMain) {
    let USER_CART = await getUserCart();
    if (USER_CART.length) {
      Cart();
    } else {
      messageBox("Your Cart is empty :(", "products", "red");
    }
  } else {
    toggleCartItemIcon(iconElement);
  }
}

// // Show Products on HTML
function showProducts(data, cart, wishlist) {
  productsSection.innerHTML = ``;
  totalprice = 0;
  if (cart) {
    data = data.filter((v1) => cart.some((v2) => v1.id == v2.id));
    // <img src="${BASE_URL}${v.image.url}" alt="${v.title}" />
    //   displaydata
    data.map((v, i) => {
      totalprice = v.price + totalprice;
      productsSection.innerHTML += `
          <li>
              <div class="card">
              
              <div class="card-header">
                <h3>${v.title}</h3>      
                <div class="card-img">    
                <img  src="${v.image_url}" alt="${v.title}" />
                </div>
                </div>
                <div class="card-description"> 
                    <button  class="addQty" data-price="${v.id}"> +</button>
                    <span class="totalQty">1</span>
                    <button  class="subQty" data-price="${v.id}"> - </i></button>
                    <br />
                    <span class="displayItemPrice">${v.price} $</span>
                </div>
                <div class="card-footer">
                  <a href="productDetail.html?id=${i}">Details</a>
                  <button  class="fav" data-item="${v.id}"><i class="fa fa-heart"></i></button>
                  <button  class="cart" data-item="${v.id}"><i class="fa fa-times"></i></button>
                </div>
              </div>
          </li>`;
    });

    // Calculate Single Cart Quantity
    cart.map((ci, i) => {
       document.getElementsByClassName("totalQty")[i].innerHTML = `${ci.qty}`;
    });

    showIcons(cart, wishlist);
    calculteTotalCartPrice(data, cart);
    toggleBucketItems("fav", `data-item`, togglefavProduct, false);
    toggleBucketItems("cart", `data-item`, toggleCartProduct, true);

    productQtyCalculation("addQty", `data-price`, ProductQty, true, cart, data);
    productQtyCalculation(
      "subQty",
      `data-price`,
      ProductQty,
      false,
      cart,
      data
    );
  }
}

function ProductQty(id, isCalled, cart, data) {
  event.preventDefault();
  let qty = 0;

  // Calculate Single Cart Quantity
  cart.map((ci, i) => {
    if (id == ci.id) {
      qty = ci.qty;
      if (isCalled) {
        qty++;
        qty = qty > 10 ? 10 : qty;
        qty >= 10 ? flashAlert("Choose less than 10 items.", "orange"): null
      } else {
        qty--;
        qty = qty <= 0 ? 1 : qty;
        qty <= 1 ? flashAlert("Choose more 1 item", "orange") : null
      }
      ci.qty = qty;
      updateUserCart(id, qty);
      document.getElementsByClassName("totalQty")[i].innerHTML = `${qty}`;
    }
  });

  calculteTotalCartPrice(data, cart);
}

function calculteTotalCartPrice(data, cart) {
  let totalPrice = 0;
  let productPrice = 0;
  let productQuantity = 0;
  let singlrProductTotalPrice = 0;

  data.map((pv) => {
    cart.map((cv, i) => {
      if (cv.id == pv.id) {
        productPrice = pv.price;
        productQuantity = cv.qty;
        productPrice = parseFloat(productPrice);
        productQuantity = parseFloat(productQuantity);
        singlrProductTotalPrice = productPrice * productQuantity;
        document.getElementsByClassName("displayItemPrice")[
          i
        ].innerHTML = `${singlrProductTotalPrice}`;
        totalPrice = totalPrice + singlrProductTotalPrice;
      }
    });
  });
  totalPrice = Math.round(totalPrice);
  totalPriceSection.innerHTML = `${totalPrice}`;
}
