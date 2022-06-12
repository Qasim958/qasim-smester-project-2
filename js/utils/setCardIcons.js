export function showIcons(cart, wishlist) {
    let cartIconData;
    let cartIconElement = document.querySelectorAll("[data-item]");
    
    for (var i = 0; i < cartIconElement.length; i++) {
      cartIconData = cartIconElement[i].children[0];
      
      if (cartIconData.classList.contains("fa-shopping-cart")) {
        cart.map((v) => {
          if (v.id == cartIconElement[i].dataset.item) {
            cartIconData.classList.remove("fa-shopping-cart");
            cartIconData.classList.add("fa-times");
          }
        });
      }
      if (cartIconData.classList.contains("fa-heart")) {
        wishlist.map((v) => {
          if (v == cartIconElement[i].dataset.item) {
            cartIconData.classList.remove("fa-heart");
            cartIconData.classList.add("fa-times");
          }
        });
      }
    }
}


    // cart.map((ci) => {
    //   if (v.id == ci.id) {
    //     document
    //       .getElementsByClassName("cart")
    //       [i].children[0].classList.remove("fa-shopping-cart");
    //     document
    //       .getElementsByClassName("cart")
    //       [i].children[0].classList.add("fa-times");
    //   }
    // });
    // wishlist.map((wli) => {
    //   if (v.id == wli) {
    //     document
    //       .getElementsByClassName("fav")
    //       [i].children[0].classList.remove("fa-heart");
    //     document
    //       .getElementsByClassName("fav")
    //       [i].children[0].classList.add("fa-times");
    //   }
    // });