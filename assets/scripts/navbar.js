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

// handle key press of Enter in the Search Input Field
document
  .querySelector('.search-input')
  .addEventListener('keypress', handleSearchEnterKey);
function handleSearchEnterKey(e) {
  if (e.key === 'Enter') {
    console.log(e.key);
    searchClick();
    window.parent.location.href = document.getElementById('search-icon').href;
  }
}

// handle click of the search-icon
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

// code for changing login/signup button on the navbar to change to Logout for sysPref pagevar url =
let isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn === 'true') {
  //remove Log In Button div from the navbar
  document.getElementById(
    'login-logout-btn-div'
  ).innerHTML = `<a target="_parent" class="all-links-text-decoration">
  <button class="all-nav-btns">
      <span class="material-icons"  id="login-logout-icon">
          logout
      </span>
  </button>
  <br />
  <h5 class="nav-link-name" id="login-logout-text"> Logout</h5>
</a>`;
  let settingsElement = `<div class="nav-links">
    <a href="./src/sysPref.html" target="_parent" class="all-links-text-decoration">
        <button class="all-nav-btns">
            <span class="material-icons">
                settings
            </span>
        </button>
        <br />
        <h5 class="nav-link-name"> Settings</h5>
    </a>
</div>`;
  document.getElementById('nav-btns-div').innerHTML += settingsElement;
}

document
  .getElementById('login-logout-btn-div')
  .addEventListener('click', handleLogout);
function handleLogout() {
  let loginLogoutIconText =
    document.getElementById('login-logout-icon').innerText;
  if (loginLogoutIconText === 'login') {
    window.parent.location.pathname = '/src/login.html';
  } else if (loginLogoutIconText === 'logout') {
    var userAnswer = window.confirm('You will be logged out. Are you sure?');
    if (userAnswer) {
      console.log('logged out');
      localStorage.setItem('isLoggedIn', false);
      window.location.reload();
    }
  }
}
