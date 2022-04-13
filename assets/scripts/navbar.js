// code for changing login/signup button on the navbar to change to Logout for sysPref pagevar url =
if (window.parent.location.pathname === '/src/sysPref.html') {
  document.getElementById('login-logout-icon').innerText = 'logout';
  document.getElementById('login-logout-text').innerText = 'Logout';
}

// localStorage.clear();

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

// handle search button click
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
