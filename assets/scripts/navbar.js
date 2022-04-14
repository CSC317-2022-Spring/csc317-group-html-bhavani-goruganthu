// code for changing login/signup button on the navbar to change to Logout for sysPref pagevar url =
if (window.parent.location.pathname === '/src/sysPref.html') {
  document.getElementById('login-logout-icon').innerText = 'logout';
  document.getElementById('login-logout-text').innerText = 'Logout';
}

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
