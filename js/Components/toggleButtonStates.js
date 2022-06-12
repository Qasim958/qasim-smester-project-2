export function toggleBucketItems(itemClass, dataKey, toggleItem, callBackToMain) {
    var product = document.getElementsByClassName(itemClass);
  
    for (let i = 0; i < product.length; i++) {
      product[i].addEventListener("click", function () {
        toggleItem(this.getAttribute(dataKey),callBackToMain, product[i]);
      });
      
    }
    
  }
  
  export function productQtyCalculation(itemClass, dataKey, toggleItem,callBackToMain, cart,data ) {
    var product = document.getElementsByClassName(itemClass);
  
    for (let i = 0; i < product.length; i++) {
      product[i].addEventListener("click", function () {
        toggleItem(this.getAttribute(dataKey), callBackToMain, cart, data, product[i]);
      });
    }
  }
  