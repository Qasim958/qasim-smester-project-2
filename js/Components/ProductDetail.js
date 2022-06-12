import { getUserCart } from "../data/cart.js";
import { getUserWishlist } from "../data/wishList.js";
import { showIcons } from "../utils/setCardIcons.js";
import { getProducts } from "./../data/products.js";
import { toggleCartProduct } from "./Cart.js";
import { toggleBucketItems } from "./toggleButtonStates.js";
import { togglefavProduct } from "./WishList.js";

const productsSection = document.querySelector("#products");
let product_id;

export async function ProductDetail() {
  product_id = new URLSearchParams(window.location.search).get("id");

  if (product_id < 0 || product_id > products.length) {
    location.replace("index.html");
  }

  let productsGetter = await getProducts();
  let productsCartGetter = await getUserCart();
  let productsWishListGetter = await getUserWishlist();

  showProducts(productsGetter, productsCartGetter, productsWishListGetter);
  // Initiate zoom effect:
  imageZoom("myimage", "myresult");
}

// Show Products on HTML
function showProducts(data, cart, wishlist) {
  //   displaydata
  data.map((v, i) => {
    if (i == product_id) {
      // <img id="myimage" src="${BASE_URL}${v.image.url}" alt="${v.title}" />
      productsSection.innerHTML = `
        <li>
            <div class="card single-card">
              

              <div class="card-header">
                <h3>${v.title}</h3>      
              </div>
              <div class="card-img">
                <img id="myimage" src="${v.image_url}" alt="${v.title}" />
              </div>
              <div class="img-zoom-container">
                <div id="myresult" class="img-zoom-result"></div>
              </div>
              <div class="card-description">
               <span>${v.price} $</span>
               
               <p>${v.description} $</p>
              </div>

              <div class="card-footer">
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

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

