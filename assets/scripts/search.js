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
    afterLoading();
    return;
  }
  // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
  window.setTimeout(checkIframeLoaded, 100);
}

function afterLoading() {
  fetch('../assets/data/products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // remove any spaces between the words.. Example: "Indoor Plants" => "IndoorPlants"
      selectedCategory = selectedCategory.replace(/\s+/g, '');
      //   if All products need to be searched
      if (selectedCategory === 'AllProducts') {
        let filtered = []; // initialize an empty array to push the filtered products into it
        Object.entries(data).filter((key) => {
          // filtered products by description; key[1] has the products list.. key[0] is the category name
          const temp1 = Object.values(key[1]).filter(
            (prod) =>
              prod.description
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) //prod.description has the description of each product & we check if the search keyword is in it.
          );
          if (temp1.length != 0) {
            // checking to include only non empty results
            temp1.forEach((temp) => {
              // inserting the filtered products along with the category
              filtered.push({ category: key[0], product: temp });
            });
          }
          // filtered products by name
          const temp2 = Object.values(key[1]).filter(
            (prod) =>
              prod.name.toLowerCase().includes(searchKeyword.toLowerCase()) //prod.name has the name of each product & we check if the search keyword is in it.
          );
          if (temp2.length != 0) {
            // checking to include only non empty results
            temp2.forEach((temp) => {
              // inserting the filtered products along with the category
              filtered.push({ category: key[0], product: temp });
            });
          }
        });
        const uniqueFilteredProducts = getUniqueProducts(filtered); // remove duplicate results
        uniqueFilteredProducts.forEach((obj) => {
          // use category & product information to populate the page
          document.getElementById(
            'products-div'
          ).innerHTML += `<div class="product-container">
                            <a href="./productPage.html?type=${obj.category}&id=${obj.product.id}">
                              <img class="product-img" width="300" height="300" src=".${obj.product.imageUrl}">
                            </a>
                            <div class="product-description-container">
                              <p class="product-name">${obj.product.name}</p>
                              <p class="product-price"> $${obj.product.price}</p>
                            </div>
                          </div>`;
        });
      } else {
        //  searching based on plant category - a diff way cz we know the category to search for
        let filteredCategory = Object.entries(data).filter(
          (key) => key.includes(selectedCategory) // get the products filtered by category
        );
        // the products that belong to the category are in filteredCategory[0][1]
        const filteredProductsByName = filteredCategory[0][1].filter(
          (e) => e.name.toLowerCase().includes(searchKeyword.toLowerCase()) // e.name has the product's name and we search the keyword in it
        );
        const filteredProductsByDescription = filteredCategory[0][1].filter(
          (e) =>
            e.description.toLowerCase().includes(searchKeyword.toLowerCase()) // e.description has the product's description and we search the keyword in it
        );
        const allFilteredProducts = [
          ...filteredProductsByName,
          ...filteredProductsByDescription,
        ];
        const uniqueFilteredProducts = getUniqueProducts(allFilteredProducts); // remove duplicate results
        displaySearchResults(uniqueFilteredProducts); // display the unique results on the page
      }
    });
}

function getUniqueProducts(allFilteredProducts) {
  let jsonObject = allFilteredProducts.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueFilteredProducts = Array.from(uniqueSet).map(JSON.parse);
  return uniqueFilteredProducts;
}

function displaySearchResults(uniqueFilteredProducts) {
  uniqueFilteredProducts.forEach((product) => {
    document.getElementById(
      'products-div'
    ).innerHTML += `<div class="product-container">
                    <a href="./productPage.html?type=${selectedCategory}&id=${product.id}">
                      <img class="product-img" width="300" height="300" src=".${product.imageUrl}">
                    </a>
                    <div class="product-description-container">
                      <p class="product-name">${product.name}</p>
                      <p class="product-price"> $${product.price}</p>
                    </div>
                  </div>`;
  });
}
