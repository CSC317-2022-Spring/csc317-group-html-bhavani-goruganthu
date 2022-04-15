// Get url parameters to know the id & type of the product
const urlParams = new URLSearchParams(window.location.search);
let urlProductType = urlParams.get('type');
let urlProductId = urlParams.get('id');

// fetch product details & display
fetch('../assets/data/products.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let filtered = Object.entries(data).filter((key) =>
      key.includes(urlProductType)
    );
    let product = filtered[0][1].filter((key) => key.id == urlProductId);
    return product;
  })
  .then((product) => {
    // Populating the Product Details
    document.getElementById('product-title').innerText = product[0].name;
    document.getElementById('prod-img').src = '.' + product[0].imageUrl;
    document.getElementById(
      'product-info-description'
    ).innerHTML = `<b>Description:</b> ${product[0].description}`;
    document.getElementById(
      'product-info-price'
    ).innerHTML += `${product[0].price}`;

    // Populating Ratings & Reviews Section using a function defined below
    updateRating(product[0], 'rating-stars');

    // Ratings Count
    document.getElementById(
      'rating-count'
    ).innerText = `${product[0].rating} based on ${product[0].reviews.length} reviews`;

    // Ratings Cards
    product[0].reviews.forEach((review) => {
      document.getElementById(
        'ratings-div'
      ).innerHTML += `<!-- Card div --><div class="card">
            <div class="card-top">
                <b class="card-name">${review.reviewer}</b>
                <!-- Stars div -->
                <div id="stars-div-${review.id}" class="stars-flex">
                </div><!-- End of stars div -->       
            </div>
            <small>${review.reviewDate}</small><br />
            <div class="card-body">
                <em><small>${review.comments}</small></em>
            </div>
        </div><!-- End of Card div -->`;

      // Populating Ratings & Reviews Section using a function defined below
      updateRating(review, `stars-div-${review.id}`);
    });
  });

// Populating Ratings & Reviews Section
function updateRating(ratingDetail, divId) {
  // Rating Stars
  if (ratingDetail.rating === Math.floor(ratingDetail.rating)) {
    for (i = 0; i < ratingDetail.rating; i++) {
      document.getElementById(
        `${divId}`
      ).innerHTML += `<span class="material-icons star-icon-fill">star</span>`;
    }
    for (i = 0; i < 5 - ratingDetail.rating; i++) {
      document.getElementById(
        `${divId}`
      ).innerHTML += `<span class="material-icons star-icon-nofill">star_outline</span>`;
    }
  } else {
    for (i = 0; i < Math.floor(ratingDetail.rating); i++) {
      document.getElementById(
        `${divId}`
      ).innerHTML += `<span class="material-icons star-icon-fill">star</span>`;
    }
    document.getElementById(
      `${divId}`
    ).innerHTML += `<span class="material-icons star-icon-fill">star_half</span>`;
    for (i = 0; i < 4 - Math.floor(ratingDetail.rating); i++) {
      document.getElementById(
        `${divId}`
      ).innerHTML += `<span class="material-icons star-icon-nofill">star_outline</span>`;
    }
  }
}

// working with adding product to cart
let addToCartBtn = document.getElementById('product-info-button');
addToCartBtn.addEventListener('click', onClickAddProductToCart);
function onClickAddProductToCart() {
  let quantityDropdown = document.getElementById('quantity');
  let quantity = quantityDropdown.options[quantityDropdown.selectedIndex].value;
  console.log(quantity);
  const currentCartProducts =
    JSON.parse(localStorage.getItem('cartProducts')) || [];
  currentCartProducts.push({
    id: parseInt(urlProductId),
    quantity: parseInt(quantity),
    type: urlProductType,
  });
  localStorage.setItem('cartProducts', JSON.stringify(currentCartProducts));
  console.log(JSON.parse(localStorage.getItem('cartProducts')));

  // reload the navbar to update cart count
  var navbarIframe = document.getElementById('navbar-iframe');
  navbarIframe.contentWindow.location.reload();
}
