// code for changing login/signup button on the navbar to change to Logout for sysPref pagevar url =

window.onload = function () {
  let logoutText = document.getElementById('login-logout-text');
  let loginButton = document.getElementById('login/logout-button');
  let navButtons = document.getElementById('nav-button-change');
  let user = localStorage.getItem('users');

  loginButton.addEventListener('click', logoutUser);

  function logoutUser() {
    localStorage.removeItem('users');
    logoutText.innerHTML =
      '<h5 class="nav-link-name" id="login-logout-text" > Login/Signup</h5>';
  }
  if (user) {
    logoutText.innerHTML =
      '<h5 class="nav-link-name" id="login-logout-text" > Logout</h5>';
    navButtons.innerHTML = `
<div class="nav-links">
    <a href="./src/about.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons-outlined">
                info
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> About</h5>
    </a>
</div>

<div class="nav-links">
    <a href="./src/faq.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                help_outline
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> FAQ</h5>
    </a>
</div>

<div class="nav-links">
    <a href="./src/cart.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                shopping_cart
            </span>
            <span id="cart-count" class="badge">0</span>
        </button>
        <br />
        <h5 class="nav-link-name"> Cart</h5>
    </a>
</div>

<div class="nav-links">
    <a href="./src/sysPref.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                settings
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> Settings</h5>
    </a>
</div>

<div id="cart-number"></div>`;
  } else {
    navButtons.innerHTML = `
<div class="nav-links">
    <a href="./src/about.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons-outlined">
                info
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> About</h5>
    </a>
</div>

<div class="nav-links">
    <a href="./src/faq.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                help_outline
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> FAQ</h5>
    </a>
</div>

<div class="nav-links">
    <a href="./src/cart.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                shopping_cart
            </span>
            <span id="cart-count" class="badge">0</span>
        </button>
        <br />
        <h5 class="nav-link-name"> Cart</h5>
    </a>
</div>

<div id="cart-number"></div>`;
  }

  // handle cart count update - get count from localStorage cartProducts
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  if (cartProducts.length === 0) {
    document.getElementById('cart-count').innerText = cartProducts.length;
  } else {
    let cartLength = 0;
    Object.values(cartProducts).filter((prod) => {
      cartLength += parseInt(prod.quantity);
    });
    document.getElementById('cart-count').innerText = cartLength;
  }
};

document.getElementById('search-icon').addEventListener('click', searchClick);

function searchClick() {
  // get the category selected from the dropdown and the search keyword
  let select = document.getElementById('category');
  let selectedCategory = 'All Products';
  selectedCategory = select.options[select.selectedIndex].text;
  let searchKeyword = '';
  searchKeyword = document.querySelector('.search-input').value.trim();
  // add parameters to the href of the search-icon
  document.getElementById(
    'search-icon'
  ).href = `./src/search.html?category=${selectedCategory}&keyword=${searchKeyword}`;
}
