// fetch the list of categories from the db
let apiRoute = '';
fetch('http://localhost:4000/api/products/getAllCategories')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const categories = [];
    Object.values(data).forEach((data) =>
      categories.push(data.productCategory)
    );
    return categories;
  })
  .then((categories) => {
    categories.forEach((category) => {
      // set the apiRoute
      apiRoute = `http://localhost:4000/api/search/searchByCategory?category=${category}`;
      // Fetch products from the backend and display the products on the home page
      fetch(apiRoute)
        .then((res) => {
          return res.json();
        })
        .then((fetchedProducts) => {
          displayProductCategory(category);
          displayFetchedProducts(fetchedProducts, category);
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.error(err));

// add Category heading to the DOM
function displayProductCategory(category) {
  document.getElementById('home').innerHTML += `      <div id="row">
  <h2 class="plant-category">${category}</h2>
  <div id="${category}-div" class="category-container">
  </div>
  </div>`;
}

// Inserting products to the DOM along with the classnames
function displayFetchedProducts(fetchedProducts, category) {
  fetchedProducts.forEach((product) => {
    document.getElementById(`${category}-div`).innerHTML += ` 
    <div class="product-container">
    <a href="./src/productPage.html?type=${product.productCategory}&id=${product.productID}">
      <img class="product-img" width="300" height="300" src="${product.productImageUrl}">
    </a>
    <div class="product-description-container">
      <p class="product-name">${product.productName}</p>
      <p class="product-price"> $${product.productPrice}</p>
    </div>
  </div>`;
  });
}
