import { checkSession } from "../../admin/js/utilities/checkSession.js";

export async function TopMenu() {
  const isLoggedIn = await checkSession();
  if (isLoggedIn) {
    document.querySelector(".top-menu").innerHTML = `
    <div class="top-contact">
          +323-468-889 | sfs@gmail.com | 
          <a href="admin/index.html"><i class="fa fa-cogs"></i> Dashboard</a> |
          <a href="admin/signout.html"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
        <ul>
          <li>
            <a href="wishlist.html"><i class="fa fa-heart"></i></a>
          </li>
          <li>
            <a href="cart.html"><i class="fa fa-shopping-cart"></i></a>
          </li>

        </ul>
    `;
  } else {
    document.querySelector(".top-menu").innerHTML = `
  <div class="top-contact">
  +323-468-889 | sfs@gmail.com | 
  <a href="admin/signin.html"><i class="fa fa-sign-in"></i> Signin</a>
</div>
<ul>
  <li>
    <a href="wishlist.html"><i class="fa fa-heart"></i></a>
  </li>
  <li>
    <a href="cart.html"><i class="fa fa-shopping-cart"></i></a>
  </li>

</ul>

    `;
  }
}
