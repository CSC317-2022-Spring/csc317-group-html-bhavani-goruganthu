const urlParams = new URLSearchParams(window.location.search);
let selectedCategory = urlParams.get('category');
let searchKeyword = urlParams.get('keyword');

// check if navbar has loaded - this function is called in the body tag of search.html
function checkIframeLoaded() {
  //  Get a handle to the iframe element
  var iframe = document.getElementById('navbar-iframe');
  var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  // Check if loading is complete
  if (iframeDoc.readyState === 'complete') {
    // retain the search keyword in the input field
    iframeDoc.querySelector('.search-input').value = searchKeyword;
    // code to retain the dropdown value in search.html
    let select = iframeDoc.getElementById('category');
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text === selectedCategory) {
        select.selectedIndex = i;
        break;
      }
    }
    select.options[select.selectedIndex].text = selectedCategory;

    // The loading is complete, call the function we want executed once the iframe is loaded
    onLoad();
    return;
  }
  // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
  window.setTimeout(checkIframeLoaded, 100);
}

function onLoad() {
  let apiRoute = ''; // use the appropriate Backend API based on user search filters
  // searchGetAllProducts route
  if (selectedCategory === 'All Products' && searchKeyword === '') {
    apiRoute = 'http://localhost:4000/api/search/searchGetAllProducts';
    fetchProducts(apiRoute);
  }
  // searchByCategory route
  else if (selectedCategory !== 'All Products' && searchKeyword === '') {
    apiRoute = `http://localhost:4000/api/search/searchByCategory?category=${selectedCategory}`;
    fetchProducts(apiRoute);
  }
  // searchByKeyword route
  else if (selectedCategory === 'All Products' && searchKeyword !== '') {
    apiRoute = `http://localhost:4000/api/search/searchByKeyword?keyword=${searchKeyword}`;
    fetchProducts(apiRoute);
  }
  // searchByCatgeoryNKeyword route
  else if (selectedCategory !== 'All Products' && searchKeyword !== '') {
    apiRoute = `http://localhost:4000/api/search/searchByCategoryNKeyword?category=${selectedCategory}&keyword=${searchKeyword}`;
    fetchProducts(apiRoute);
  }
}

// fetch call to get products from backend API Routes based on user search filters
function fetchProducts(apiRoute) {
  fetch(apiRoute)
    .then((res) => {
      return res.json();
    })
    .then((fetchedProducts) => {
      displaySearchResults(fetchedProducts);
    })
    .catch((err) => {
      console.log(err);
    });
}

function displaySearchResults(fetchedProducts) {
  fetchedProducts.forEach((product) => {
    document.getElementById(
      'products-div'
    ).innerHTML += `<div class="product-container">
                    <a href="./productPage.html?type=${product.productCategory}&id=${product.product_id}">
                      <img class="product-img" width="300" height="300" src=".${product.productImageUrl}">
                    </a>
                    <div class="product-description-container">
                      <p class="product-name">${product.productName}</p>
                      <p class="product-price"> $${product.productPrice}</p>
                    </div>
                  </div>`;
  });
}
