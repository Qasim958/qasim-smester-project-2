import { checkSession } from "../utilities/checkSession.js";

export async function TopMenu() {
  const isLoggedIn = await checkSession();
  if (isLoggedIn) {
    document.querySelector(".top-menu").innerHTML = `
    <div class="top-contact">
          ADMIN PANEL | 
          <a href="../index.html"><i class="fa fa-home"></i> Home</a> |
          <a href="signout.html"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
        <ul>          
          <li>
            <a href="../wishlist.html"><i class="fa fa-heart"></i></a>
          </li>
          <li>
            <a href="../cart.html"><i class="fa fa-shopping-cart"></i></a>
          </li>
        </ul>
    `;
  } else {
    document.querySelector(".top-menu").innerHTML = `
  <div class="top-menu">
  <div class="top-contact">
    ADMIN PANEL |
    <a href="signout.html" ><i class="fa fa-sign-out"></i> LOGOUT</a>
  </div>
  <ul>
    <li>
      <a href="../wishlist.html"><i class="fa fa-heart"></i></a>
    </li>
    <li>
      <a href="../cart.html"><i class="fa fa-shopping-cart"></i></a>
    </li>
  </ul>
</div>
  `;
  }
}
