import { getProducts } from "../data/products.js";
import { getUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";

const AUTH_TOKEN = getUserAuthTokenFromLocalStorage();

export async function Home() {
  const data = await getProducts();
  showAllProducts(data);
}

function showAllProducts(data) {
  const productsTableSection = document.getElementById("products");
  productsTableSection.innerHTML = "";
  console.log(data)
  if (data.length) {
    data.map((v, i) => {
      productsTableSection.innerHTML += `
            
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.title}</td>
                        <td>${v.price}</td>
                        <td>${v.featured}</td>
                        <td><img src="${v.image_url}" alt="${v.title}"/></td>
                        <td>${v.description.slice(0, 20)}...</td>
                        <td><a href="editProduct.html?id=${
                          v.id
                        }"><i class="fa fa-pencil"></i></a></td>
                        <td><button class="deleteProductBtn" data-deleteProductId="${
                          v.id
                        }" data-title="${
        v.title
      }" style="background:red;"><i class="fas fa-trash"></i></button></td>
                    </tr>
               
            `;
    });
    let deleteProdcutBtn = document.getElementsByClassName("deleteProductBtn");

    for (var i = 0; i < deleteProdcutBtn.length; i++) {
      deleteProdcutBtn[i].addEventListener("click", function () {
        deleteProduct(
          this.getAttribute("data-deleteProductId"),
          this.getAttribute("data-title")
        );
      });
    }
  } else {
    productsTableSection.innerHTML = "<h2>No Products Found</h2>";
  }
}

async function deleteProduct(productId, productTitle, isCallBack = true) {
  event.preventDefault();
  try {
    const isConfirmDelete = confirm(
      `Are you sure you want to delete ${productTitle} Item!`
    );

    if (isConfirmDelete) {
      const response = await fetch(
        `http://localhost:1337/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Origin: "*",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          }
        }
      );
      let result = await response.json();
     
      if (isCallBack) {
        Home();
         
      if (Object.keys(result) > 0) {
        messageBox(
          `${productTitle} deleted successfully`,
          "deleteProductMsg",
          "green"
        );
      } else {
        messageBox(
          `${productTitle} cannot be deleted!!`,
          "deleteProductMsg",
          "green"
        );
      }
      }
    }
  } catch (error) {}
}
