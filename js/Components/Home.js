import { BASE_URL } from "../api/index.js";
import { getHomeHeader, setHomeHeader } from "../data/home.js";
import { getProducts, setProducts } from "./../data/products.js";
import { togglefavProduct } from "./WishList.js";
import { toggleCartProduct } from "./Cart.js";
import { toggleBucketItems } from "./toggleButtonStates.js";
import { getUserCart } from "../data/cart.js";
import { getUserWishlist } from "../data/wishList.js";
import { showIcons } from "../utils/setCardIcons.js";

const productsSection = document.querySelector("main section ul");
const headerSection = document.querySelector("header");
const banner = document.querySelector(".ads");

export async function Home() {
  productsSection.innerHTML = `<h2 style="font-size:3rem;magin:auto;">Loading...</h2>`;

  let homeBannerSetter = await setHomeHeader();
  let productsSetter = await setProducts();
  let homeBannerGetter = await getHomeHeader();
  let productsGetter = await getProducts();
  let productsCartGetter = await getUserCart();
  let productsWishListGetter = await getUserWishlist();

  if (Object.keys(homeBannerGetter).length == 0) {
    homeBannerSetter = await setHomeHeader();
    homeBannerGetter = await getHomeHeader();
  }

  if (!productsGetter.length) {
    productsSetter = await setProducts();
    productsGetter = await getProducts();
  }

  showHomeHeader(homeBannerGetter);
  showProducts(productsGetter, productsCartGetter, productsWishListGetter);

  if (!productsGetter) {
    productsSection.innerHTML = `<h2 style="font-size:3rem;magin:auto;">No Products Found</h2>`;
    return;
  }
}

// Show Home Header IMAGE
function showHomeHeader({ data }) {
  banner.style.backgroundImage = `url("${BASE_URL}${data.hero_banner.url}")`;
  banner.style.backgroundImage = `url("admin/images/banner.jpg")`;
  banner.style.backgroundSize = `cover`;
  banner.style.backgroundRepeat = `no-repeat`;
  // banner.style.backgroundAttachment = `fixed`;
  headerSection.style.backgroundImage = `url("${BASE_URL}${data.hero_banner.url}")`;
  headerSection.style.backgroundSize = `cover`;
  headerSection.style.backgroundRepeat = `no-repeat`;
  headerSection.style.backgroundAttachment = `fixed`;
}

// Show Products on HTML
function showProducts(data, cart, wishlist) {
  productsSection.innerHTML = "";
  //   displaydata
  data.map((v, i) => {
    if (v.featured) {
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
    }
  });

  showIcons(cart, wishlist);
  toggleBucketItems("fav", `data-item`, togglefavProduct, false);
  toggleBucketItems("cart", `data-item`, toggleCartProduct, false);
}



export function toggleCartItemIcon(Item) {
  let toggleElement = Item.children[0];
  let toggleShoppingIcon = toggleElement.classList.contains("fa-shopping-cart");
  let toggleCrossIcon = toggleElement.classList.contains("fa-times");

  if (toggleShoppingIcon) {
    toggleElement.classList.remove("fa-shopping-cart");
    toggleElement.classList.add("fa-times");
  } else if (toggleCrossIcon) {
    toggleElement.classList.remove("fa-times");
    toggleElement.classList.add("fa-shopping-cart");
  }
}
export function toggleWishListItemIcon(Item) {
  let toggleElement = Item.children[0];
  let toggleShoppingIcon = toggleElement.classList.contains("fa-heart");
  let toggleCrossIcon = toggleElement.classList.contains("fa-times");

  if (toggleShoppingIcon) {
    toggleElement.classList.remove("fa-heart");
    toggleElement.classList.add("fa-times");
  } else if (toggleCrossIcon) {
    toggleElement.classList.remove("fa-times");
    toggleElement.classList.add("fa-heart");
  }
}
