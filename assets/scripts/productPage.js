// Get url parameters to know the id & type of the product
const urlParams = new URLSearchParams(window.location.search);
let urlProductType = urlParams.get('type');
let urlProductId = urlParams.get('id');

// fetch product details & display
fetch(
  `http://localhost:4000/api/products/getProductByID?productID=${urlProductId}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const reviews = JSON.parse(data[0].productReviews);
    // Populating the Product Details
    document.getElementById('product-title').innerText = data[0].productName;
    document.getElementById('prod-img').src = '.' + data[0].productImageUrl;
    document.getElementById(
      'product-info-description'
    ).innerHTML = `<b>Description:</b> ${data[0].productDescription}`;
    document.getElementById(
      'product-info-price'
    ).innerHTML += `${data[0].productPrice}`;

    // Populating Ratings & Reviews Section using a function defined below
    updateRating(data[0], 'rating-stars');

    // Ratings Count
    document.getElementById(
      'rating-count'
    ).innerText = `${data[0].productRating} based on ${reviews.length} reviews`;

    // Ratings Cards
    reviews.forEach((review) => {
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
  })
  .catch((err) => console.error(err));

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
  const currentCartProducts =
    JSON.parse(localStorage.getItem('cartProducts')) || [];
  // Before adding any cart product
  // check if the cart is empty
  if (currentCartProducts.length === 0) {
    // add the current cart product directly
    currentCartProducts.push({
      id: parseInt(urlProductId),
      quantity: parseInt(quantity),
      type: urlProductType,
    });
  }
  // if the cart is not empty
  else {
    // check if the product that you are trying to add already exists in the cart
    let cartProductExists = currentCartProducts.filter(
      (prod) => prod.id == urlProductId
    );
    //  if yes, then increase its quantity
    if (cartProductExists.length !== 0) {
      currentCartProducts.forEach((prod) => {
        if (prod.id == urlProductId) {
          prod.quantity = parseInt(
            parseInt(prod.quantity) + parseInt(quantity)
          );
        }
      });
    }
    // if no, add the cart product directly to the cart
    else {
      currentCartProducts.push({
        id: parseInt(urlProductId),
        quantity: parseInt(quantity),
        type: urlProductType,
      });
    }
  }

  localStorage.setItem('cartProducts', JSON.stringify(currentCartProducts));

  // reload the navbar to update cart count
  var navbarIframe = document.getElementById('navbar-iframe');
  navbarIframe.contentWindow.location.reload();
}
